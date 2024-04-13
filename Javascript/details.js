document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const pokemonName = params.get("pokemon");
  if (!pokemonName) {
    return;
  }

  fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
    .then((response) => response.json())
    .then((data) => {
      const detailsContainer = document.getElementById("pokemon-details");
      if (!detailsContainer) {
        return;
      }

      const imageSection = document.createElement("div");
      imageSection.className = "details-section";
      const sprite = data.sprites.front_default;
      imageSection.innerHTML = `<img src="${sprite}" alt="${pokemonName} image"><h2>${pokemonName.toUpperCase()}</h2>`;
      detailsContainer.appendChild(imageSection);

      const abilitiesSection = document.createElement("div");
      abilitiesSection.className = "details-section";
      abilitiesSection.innerHTML = `<h3>Abilities</h3><ul>${data.abilities
        .map((ability) => `<li>${ability.ability.name}</li>`)
        .join("")}</ul>`;
      detailsContainer.appendChild(abilitiesSection);

      const statsSection = document.createElement("div");
      statsSection.className = "details-section";
      statsSection.innerHTML = `<h3>Stats</h3><ul>${data.stats
        .map((stat) => `<li>${stat.stat.name}: ${stat.base_stat}</li>`)
        .join("")}</ul>`;
      detailsContainer.appendChild(statsSection);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
