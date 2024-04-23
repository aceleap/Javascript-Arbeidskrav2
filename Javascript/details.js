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
      imageSection.innerHTML = `
        <img src="${sprite}" alt="${pokemonName} image">
        <h2>${pokemonName.toUpperCase()}</h2>
        <button id="delete-pokemon" style="padding: 8px 16px; background-color: #ff6347; color: white; border: none; border-radius: 5px; cursor: pointer;">Delete Pokémon</button>
      `;
      detailsContainer.appendChild(imageSection);

      document
        .getElementById("delete-pokemon")
        .addEventListener("click", function () {
          if (confirm("Are you sure you want to delete this Pokémon?")) {
            fetch("http://localhost:3000/pokemon/" + pokemonName, {
              method: "DELETE",
            })
              .then(() => {
                alert("Pokémon deleted!");
                window.location.href = "index.html";
              })
              .catch((error) =>
                console.error("Error deleting Pokémon:", error)
              );
          }
        });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
