document.addEventListener("DOMContentLoaded", function () {
  const typesContainer = document.getElementById("types-container");
  const allPokemon = localStorage.getItem("allPokemon")
    ? JSON.parse(localStorage.getItem("allPokemon"))
    : [];

  function displayPokemon(pokemon) {
    const pokemonCard = document.createElement("div");
    pokemonCard.className = "type-card";
    const image = document.createElement("img");
    image.src = pokemon.sprites.normal;
    image.alt = pokemon.name;
    pokemonCard.appendChild(image);
    pokemonCard.addEventListener("click", () => {
      window.location.href = "details.html?pokemon=" + pokemon.name;
    });
    typesContainer.appendChild(pokemonCard);
  }

  if (allPokemon.length === 0) {
    fetch("http://localhost:3000/pokemon")
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("allPokemon", JSON.stringify(data));
        data.forEach(displayPokemon);
      })
      .catch((error) => console.error("Error loading Pokémon:", error));
  } else {
    allPokemon.forEach(displayPokemon);
  }

  const resetButton = document.getElementById("reset-pokemon");
  resetButton.addEventListener("click", function () {
    if (
      confirm(
        "Are you sure you want to reset your Pokédex? This will fetch the original Pokémon list again."
      )
    ) {
      fetch("http://localhost:3000/pokemon")
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("allPokemon", JSON.stringify(data));
          alert("Pokédex has been reset.");
          window.location.reload();
        })
        .catch((error) => console.error("Error resetting Pokémon:", error));
    }
  });
});
