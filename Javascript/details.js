document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const pokemonName = params.get("pokemon");

  if (!pokemonName) {
    return;
  }

  fetch("http://localhost:3000/pokemon/" + pokemonName)
    .then((response) => response.json())
    .then((data) => {
      const detailsContainer = document.getElementById("pokemon-details");
      const imageSection = document.createElement("div");
      imageSection.className = "details-section";
      const sprite = data.sprites.animated;
      imageSection.innerHTML = `<img src="${sprite}" alt="${pokemonName} image"><h2>${pokemonName.toUpperCase()}</h2>`;
      detailsContainer.appendChild(imageSection);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
