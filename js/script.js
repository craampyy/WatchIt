const apiKey = config.apiKey; // Reemplaza con tu clave de API
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const listSection = document.querySelector('.list');

searchButton.addEventListener('click', searchMedia);

function searchMedia() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') return;

    const mediaType = document.querySelector('select').value;

    const apiUrl = `https://api.themoviedb.org/3/search/${mediaType}?api_key=${apiKey}&query=${searchTerm}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.results);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(results) {
    listSection.innerHTML = '';

    results.forEach(result => {
        const card = document.createElement('article');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500/${result.poster_path}`;
        img.alt = result.title || result.name;
        img.width = 200;

        const title = document.createElement('span');
        title.id = 'title';
        title.textContent = result.title || result.name;

        card.appendChild(img);
        card.appendChild(title);
        listSection.appendChild(card);

        console.log(result); // Mostrar información en la consola
    });
}

