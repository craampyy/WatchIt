const apiKey = config.apiKey; // Reemplaza con tu clave de API
const moviesListSection = document.querySelector(
  ".most-popular.movies .resumed-list"
);
const seriesListSection = document.querySelector(
  ".most-popular.series .resumed-list"
);

const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
const popularSeriesUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;

fetch(popularMoviesUrl)
  .then((response) => response.json())
  .then((data) => {
    const popularMovies = data.results.slice(0, 7); // Obtener las primeras 7 películas
    getGenresAndDisplay(popularMovies, moviesListSection);
  })
  .catch((error) => console.error("Error fetching popular movies:", error));

fetch(popularSeriesUrl)
  .then((response) => response.json())
  .then((data) => {
    const popularSeries = data.results.slice(0, 7); // Obtener las primeras 7 series populares
    getGenresAndDisplay(popularSeries, seriesListSection);
  })
  .catch((error) => console.error("Error fetching popular series:", error));

function getGenresAndDisplay(media, listSection) {
  const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`; // Cambiar a la URL de géneros de películas

  fetch(genreUrl)
    .then((response) => response.json())
    .then((genreData) => {
      const genreMap = {};
      genreData.genres.forEach((genre) => {
        genreMap[genre.id] = genre.name;
      });

      media.forEach((item) => {
        const genreNames = item.genre_ids.slice(0, 2).map((id) => genreMap[id]);

        item.genres = genreNames;
      });

      displayMedia(media, listSection);
    })
    .catch((error) => console.error("Error fetching genres:", error));
}

function displayMedia(media, listSection) {
  media.forEach((item) => {
    const article = document.createElement("article");
    article.classList.add("card");

    const link = document.createElement("a");
    link.href = "#";

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w200/${item.poster_path}`;
    img.alt = `Poster of ${item.title || item.name}`;
    img.width = 200;

    const info = document.createElement("div");
    info.classList.add("info");

    const title = document.createElement("span");
    title.id = "title";
    title.textContent = item.title || item.name;

    const ratingDiv = document.createElement("div");
    ratingDiv.classList.add("rating");

    const starIcon = document.createElement("span");
    starIcon.classList.add("material-icons-sharp");
    starIcon.textContent = "star";

    const ratingNumber = document.createElement("span");
    ratingNumber.id = "number";
    ratingNumber.textContent = item.vote_average;

    ratingDiv.appendChild(starIcon);
    ratingDiv.appendChild(ratingNumber);

    info.appendChild(title);
    info.appendChild(ratingDiv);

    const categoriesDiv = document.createElement("div");
    categoriesDiv.classList.add("categories");

    item.genres.forEach((genreName) => {
      if (genreName != undefined) {
        const genreSpan = document.createElement("span");
        genreSpan.textContent = genreName;
        categoriesDiv.appendChild(genreSpan);
      }
    });

    link.appendChild(img);
    link.appendChild(info);
    article.appendChild(link);
    article.appendChild(categoriesDiv);

    listSection.appendChild(article);

    console.log(item); // Mostrar información en la consola
  });
}
