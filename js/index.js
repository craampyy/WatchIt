const apiKey = config.apiKey; // Reemplaza con tu clave de API

loadMainContent();

function loadMainContent() {
  let moviesListSection = document.querySelector(
    ".most-popular.movies .resumed-list"
  );
  let seriesListSection = document.querySelector(
    ".most-popular.series .resumed-list"
  );

  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
  const popularSeriesUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;

  fetch(popularMoviesUrl)
    .then((response) => response.json())
    .then((data) => {
      const popularMovies = data.results.slice(0, 7);
      getGenresAndDisplay(popularMovies, moviesListSection, 'movie');
    })
    .catch((error) => console.error("Error fetching popular movies:", error));

  fetch(popularSeriesUrl)
    .then((response) => response.json())
    .then((data) => {
      const popularSeries = data.results.slice(0, 7);
      getGenresAndDisplay(popularSeries, seriesListSection, 'tv');
    })
    .catch((error) => console.error("Error fetching popular series:", error));
}

function getGenresAndDisplay(media, listSection, typeOf) {
  const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

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

      displayMedia(media, listSection, typeOf);
    })
    .catch((error) => console.error("Error fetching genres:", error));
}

function displayMedia(media, listSection, typeOf) {
  media.forEach((item) => {
    const article = document.createElement("article");
    article.classList.add("card");

    const link = document.createElement("a");
    link.href = `https://vidsrc.to/embed/${typeOf}/${item.id}`;

    const img = document.createElement("img");
    const itemPoster = item.poster_path;
    if (itemPoster != null) {
      img.src = `https://image.tmdb.org/t/p/w200/${item.poster_path}`;
    } else {
      img.src = `../img/img-not-found.png`;
    }
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
// SEARCH FUNCTIONS
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search");
const moviesList = document.querySelector(".list.movies");
const seriesList = document.querySelector(".list.series");
const mainContent = document.getElementById("mainContent");

searchButton.addEventListener("click", performSearch);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    performSearch();
  }
});

function performSearch() {
  const query = searchInput.value.trim();

  if (query === "") {
    clearMainContent();
    loadMainContent();
    return;
  }
  clearMainContent();
  mainContent.innerHTML = `<h2 id="results">Results for '${searchInput.value}'</h2><h3>Movies</h3><section class="list movies"></section><h3>Series</h3><section class="list series"></section>`;

  moviesListSection = document.querySelector(".list.movies");
  seriesListSection = document.querySelector(".list.series");

  const searchMoviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&sort_by=popularity.desc`;

  fetch(searchMoviesUrl)
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results;
      getGenresAndDisplay(movies, moviesListSection, 'movie');
    })
    .catch((error) => console.error("Error fetching movies:", error));

  const searchSeriesUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&query=${query}&sort_by=popularity.desc`;

  fetch(searchSeriesUrl)
    .then((response) => response.json())
    .then((data) => {
      const series = data.results;
      getGenresAndDisplay(series, seriesListSection, 'tv');
    })
    .catch((error) => console.error("Error fetching series:", error));
}

function clearMainContent() {
  const mainContent = document.getElementById("mainContent");
  mainContent.innerHTML = "";
}
