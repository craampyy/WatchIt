// const apiKey = config.apiKey; // Reemplaza con tu clave de API
const apiKey = '1b9654c10e7a7f4b6d3b1123464c993b';
const moviesListSection = document.querySelector(".list");

const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`;

fetch(popularMoviesUrl)
  .then((response) => response.json())
  .then((data) => {
    const popularMovies = data.results; // Obtener todas las películas populares de la primera página
    getGenresAndDisplay(popularMovies);
  })
  .catch((error) => console.error("Error fetching popular movies:", error));

function getGenresAndDisplay(movies) {
  const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

  fetch(genreUrl)
    .then((response) => response.json())
    .then((genreData) => {
      const genreMap = {};
      genreData.genres.forEach((genre) => {
        genreMap[genre.id] = genre.name;
      });

      movies.forEach((movie) => {
        const genreNames = movie.genre_ids
          .slice(0, 2)
          .map((id) => genreMap[id]);

        movie.genres = genreNames;
      });

      displayMovies(movies);
    })
    .catch((error) => console.error("Error fetching genres:", error));
}

function displayMovies(movies) {
  movies.forEach((movie) => {
    const article = document.createElement("article");
    article.classList.add("card");

    const link = document.createElement("a");
    link.href = "#";

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
    img.alt = `Poster of ${movie.title}`;
    img.width = 200;

    const info = document.createElement("div");
    info.classList.add("info");

    const title = document.createElement("span");
    title.id = "title";
    title.textContent = movie.title;

    const ratingDiv = document.createElement("div");
    ratingDiv.classList.add("rating");

    const starIcon = document.createElement("span");
    starIcon.classList.add("material-icons-sharp");
    starIcon.textContent = "star";

    const ratingNumber = document.createElement("span");
    ratingNumber.id = "number";
    ratingNumber.textContent = movie.vote_average;

    ratingDiv.appendChild(starIcon);
    ratingDiv.appendChild(ratingNumber);

    info.appendChild(title);
    info.appendChild(ratingDiv);

    const categoriesDiv = document.createElement("div");
    categoriesDiv.classList.add("categories");

    movie.genres.forEach((genreName) => {
      const genreSpan = document.createElement("span");
      genreSpan.textContent = genreName;
      categoriesDiv.appendChild(genreSpan);
    });

    link.appendChild(img);
    link.appendChild(info);
    article.appendChild(link);
    article.appendChild(categoriesDiv);

    moviesListSection.appendChild(article);

    console.log(movie); // Mostrar información en la consola
  });
}

