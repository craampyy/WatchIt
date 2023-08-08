// const apiKey = config.apiKey; // Reemplaza con tu clave de API
const apiKey = '1b9654c10e7a7f4b6d3b1123464c993b';
const seriesListSection = document.querySelector(".list");

const popularSeriesUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US`;

fetch(popularSeriesUrl)
  .then((response) => response.json())
  .then((data) => {
    const popularSeries = data.results; // Obtener todas las series populares de la primera página
    getGenresAndDisplay(popularSeries);
  })
  .catch((error) => console.error("Error fetching popular series:", error));

function getGenresAndDisplay(series) {
  const genreUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`;

  fetch(genreUrl)
    .then((response) => response.json())
    .then((genreData) => {
      const genreMap = {};
      genreData.genres.forEach((genre) => {
        genreMap[genre.id] = genre.name;
      });

      series.forEach((serie) => {
        const genreNames = serie.genre_ids
          ? serie.genre_ids.slice(0, 2).map((id) => genreMap[id])
          : [];

        serie.genres = genreNames;
      });

      displaySeries(series);
    })
    .catch((error) => console.error("Error fetching genres:", error));
}

function displaySeries(series) {
  series.forEach((serie) => {
    const article = document.createElement("article");
    article.classList.add("card");

    const link = document.createElement("a");
    link.href = "#";

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w200/${serie.poster_path}`;
    img.alt = `Poster of ${serie.name}`;
    img.width = 200;

    const info = document.createElement("div");
    info.classList.add("info");

    const title = document.createElement("span");
    title.id = "title";
    title.textContent = serie.name;

    const ratingDiv = document.createElement("div");
    ratingDiv.classList.add("rating");

    const starIcon = document.createElement("span");
    starIcon.classList.add("material-icons-sharp");
    starIcon.textContent = "star";

    const ratingNumber = document.createElement("span");
    ratingNumber.id = "number";
    ratingNumber.textContent = serie.vote_average;

    ratingDiv.appendChild(starIcon);
    ratingDiv.appendChild(ratingNumber);

    info.appendChild(title);
    info.appendChild(ratingDiv);

    const categoriesDiv = document.createElement("div");
    categoriesDiv.classList.add("categories");

    serie.genres.forEach((genreName) => {
      if (genreName) {
        const genreSpan = document.createElement("span");
        genreSpan.textContent = genreName;
        categoriesDiv.appendChild(genreSpan);
      }
    });

    link.appendChild(img);
    link.appendChild(info);
    article.appendChild(link);
    article.appendChild(categoriesDiv);

    seriesListSection.appendChild(article);

    console.log(serie); // Mostrar información en la consola
  });
}
