const API_KEY = 'ea4cf91d9355028909b7f06d288026fd'; 
const BASE_URL = 'https://api.themoviedb.org/3';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const moviesList = document.getElementById('moviesList');
const paginationDiv = document.getElementById('pagination');

let currentPage = 1;

function searchMovies(query, page = 1) {
    fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`)
        .then(response => response.json())
        .then(data => displayMovies(data))
        .catch(error => console.error('Error fetching data:', error));
}

function displayMovies(data) {




    
    moviesList.innerHTML = '';
    data.results.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.innerHTML = `
            <h2>${movie.title}</h2>
            <p>Release Date: ${movie.release_date}</p>
            <p>Rating: ${movie.vote_average}</p>
        `;
        moviesList.appendChild(movieDiv);
    });

    const totalPages = data.total_pages;
    paginationDiv.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            searchMovies(searchInput.value, currentPage);
        });
        paginationDiv.appendChild(pageButton);
    }
}

searchButton.addEventListener('click', () => {
    currentPage = 1;
    searchMovies(searchInput.value, currentPage);
});

searchMovies('', currentPage);