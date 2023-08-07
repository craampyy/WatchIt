const apiKey = config.apiKey; // Reemplaza con tu clave de API

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');

searchButton.addEventListener('click', searchMovies);

function searchMovies() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') return;

    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.results);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(results) {
    resultsContainer.innerHTML = '';

    results.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <h2>${movie.title}</h2>
            <p>${movie.overview}</p>
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
        `;
        resultsContainer.appendChild(movieElement);
    });
}
