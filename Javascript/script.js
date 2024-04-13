document.addEventListener("DOMContentLoaded", function () {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
    .then((response) => response.json())
    .then((data) => {
      const typesContainer = document.getElementById("types-container");
      data.results.forEach((pokemon) => {
        fetch(pokemon.url)
          .then((response) => response.json())
          .then((details) => {
            const pokemonCard = document.createElement("div");
            pokemonCard.className = "type-card";
            const image = document.createElement("img");
            image.src = details.sprites.front_default;
            image.alt = pokemon.name;
            pokemonCard.appendChild(image);
            pokemonCard.addEventListener("click", () => {
              window.location.href = "details.html?pokemon=" + pokemon.name;
            });
            typesContainer.appendChild(pokemonCard);
          });
      });
    });
});
