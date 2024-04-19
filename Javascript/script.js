document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/pokemon")
    .then((response) => response.json())
    .then((data) => {
      const typesContainer = document.getElementById("types-container");
      data.forEach((pokemon) => {
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
      });
    })
    .catch((error) => console.error("Error loading Pokémon:", error));
});
