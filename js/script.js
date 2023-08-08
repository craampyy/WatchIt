const apiKey = config.apiKey; // Reemplaza con tu clave de API
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const listSection = document.querySelector(".list");

searchButton.addEventListener("click", searchMedia);

function searchMedia() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm === "") return;

  const mediaType = document.querySelector("select").value;

  let apiUrl = "";
  
  apiUrl = `https://api.themoviedb.org/3/search/${mediaType}?api_key=${apiKey}&query=${searchTerm}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayResults(data.results);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function displayResults(results) {
  listSection.innerHTML = "";

  results.forEach((result) => {
    const card = document.createElement("article");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500/${result.poster_path}`;
    img.alt = "";
    img.width = 170;

    const info = document.createElement("section");
    info.classList.add("info");

    const year = document.createElement("span");
    year.id = "year";
    year.textContent = result.release_date
      ? result.release_date.split("-")[0]
      : "";

    const rating = document.createElement("span");
    rating.id = "rating";
    rating.textContent = result.vote_average ? `${result.vote_average}/10` : "";

    const title = document.createElement("span");
    title.id = "title";
    title.textContent = result.title || result.name;

    info.appendChild(year);
    info.appendChild(rating);

    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(title);
    listSection.appendChild(card);

    console.log(result); // Mostrar información en la consola
  });
}
