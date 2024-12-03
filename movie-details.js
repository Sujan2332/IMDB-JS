document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const imdbID = params.get('imdbID');

    if (imdbID) {
        const response = await fetch(`https://www.omdbapi.com/?apikey=70731d2&i=${imdbID}`);
        const movie = await response.json();

        if (movie.Response === "True") {
            document.getElementById('title').innerHTML = `${movie.Title}`;
            document.getElementById('poster').src = movie.Poster === "N/A" ? "https://media.tenor.com/IHdlTRsmcS4AAAAM/404.gif" : movie.Poster;
            document.getElementById('plot').textContent = movie.Plot;
            document.getElementById('year').textContent = movie.Year;
            document.getElementById('rated').textContent = movie.Rated;
            document.getElementById('released').textContent = movie.Released;
            document.getElementById('runtime').textContent = movie.Runtime;
            document.getElementById('genre').textContent = movie.Genre;
            document.getElementById('director').textContent = movie.Director;
            document.getElementById('writer').textContent = movie.Writer;
            document.getElementById('actors').textContent = movie.Actors;
            document.getElementById('language').textContent = movie.Language;
            document.getElementById('country').textContent = movie.Country;
            document.getElementById('awards').textContent = movie.Awards;
            document.getElementById('boxoffice').textContent = movie.BoxOffice;
            document.getElementById('production').textContent = movie.Production;
            document.getElementById('website').textContent = movie.Website;
            document.getElementById('imdbRating').textContent = movie.imdbRating;
            document.getElementById('imdbVotes').textContent = movie.imdbVotes;
            document.getElementById('metascore').textContent = movie.Metascore;

            const ratingsList = document.getElementById('ratings');
            ratingsList.innerHTML = '';  // Clear previous ratings
            movie.Ratings.forEach((rating) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${rating.Source}:</strong> ${rating.Value}`;
                ratingsList.appendChild(listItem);
            });
        } else {
            document.getElementById('movie-details').innerHTML = `<p>No movie details found</p>`;
        }
    } else {
        document.getElementById('movie-details').innerHTML = `<p>No movie ID provided</p>`;
    }
});

function home(){
    window.location.replace("index.html");
}
document.getElementById('heading').addEventListener('click', home);