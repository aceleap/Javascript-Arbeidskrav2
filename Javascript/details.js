document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const pokemonName = params.get("pokemon");
  if (!pokemonName) {
    window.location.href = "index.html";
    return;
  }

  const allPokemon = JSON.parse(localStorage.getItem("allPokemon")) || [];
  const pokemon = allPokemon.find((p) => p.name === pokemonName);
  if (pokemon) {
    const detailsContainer = document.getElementById("pokemon-details");
    const imageSection = document.createElement("div");
    imageSection.className = "details-section";
    const sprite = pokemon.sprites.animated;
    imageSection.innerHTML = `
      <img src="${sprite}" alt="${pokemonName} image">
      <h2>${pokemonName.toUpperCase()}</h2>
      <button id="delete-pokemon" style="padding: 8px 16px; background-color: #ff6347; color: white; border: none; border-radius: 5px; cursor: pointer;">Delete Pokémon</button>
    `;
    detailsContainer.appendChild(imageSection);
    const deleteButton = document.getElementById("delete-pokemon");
    deleteButton.addEventListener("click", function () {
      if (confirm("Are you sure you want to delete this Pokémon?")) {
        const index = allPokemon.findIndex((p) => p.name === pokemonName);
        allPokemon.splice(index, 1);
        localStorage.setItem("allPokemon", JSON.stringify(allPokemon));
        alert("Pokémon deleted!");
        window.location.href = "index.html";
      }
    });
  } else {
    alert("Pokémon not found!");
    window.location.href = "index.html";
  }
});
