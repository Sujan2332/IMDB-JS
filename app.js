let search = document.getElementById("searchbox");
let year = document.getElementById("yearbox");
let type = document.getElementById("typebox");
let suggestions = document.getElementById("suggestions");
let currentPage = 1; // Track the current page
let totalResults = 0; // Track the total number of results
let pagesPerSet = 10; // Number of pages to display per set
let currentPageSet = 1; // Track the current set of pages

async function getmovies(page = 1) {  // Add page as an argument
    let query = `https://www.omdbapi.com/?apikey=70731d2&page=${page}`;  // Include page parameter

    if (search.value) {
        query += `&s=${search.value}`;
    }
    if (year.value) {
        query += `&y=${year.value}`;
    }
    if (type.value) {
        query += `&type=${type.value}`;
    }

    let response = await fetch(query);
    let movies = await response.json();
    let omdbMovies = document.getElementById("omdbMovies");
    omdbMovies.innerHTML = '';  // Clear previous results

    if (movies.Search) {
        totalResults = parseInt(movies.totalResults);  // Get total number of results
        movies.Search.map((movie) => {
            let movieCard = document.createElement('div');
            movieCard.className = 'movie-card';

            let title = document.createElement('h1');
            title.textContent = movie.Title;
            movieCard.append(title);

            let poster = document.createElement('img');
            poster.src = movie.Poster === "N/A" ? "https://media.tenor.com/IHdlTRsmcS4AAAAM/404.gif" : movie.Poster;
            poster.alt = movie.Title;
            poster.width = 100;
            poster.height = 100;
            movieCard.append(poster);

            let year = document.createElement('h5');
            year.textContent = movie.Year;
            movieCard.append(year);

            let id = document.createElement('h6');
            id.innerText = `IMDB ID: ${movie.imdbID}`;
            movieCard.append(id);

            movieCard.addEventListener('click', () => {
                window.location.href = `index2.html?imdbID=${movie.imdbID}`;
            });

            omdbMovies.append(movieCard);
        });

        // Display pagination if more than 10 results
        if (totalResults > 10) {
            createPagination(totalResults);
        }
    } else {
        omdbMovies.innerHTML = `<p style="color:white">No results found</p>`;
        alert("No results found");
    }
}

// let searchTimeoutId = null;
// document.addEventListener('click', (event) => {
//   if (!suggestions.contains(event.target) && event.target !== search) {
//     suggestions.innerHTML = '';
//   } else {
//     clearTimeout(searchTimeoutId);
//     searchTimeoutId = setTimeout(fetchSuggestions, 500);
//   }
// });

// async function getMovies(page = 1) {
//     clearTimeout(searchTimeoutId);
//     searchTimeoutId = setTimeout(async () => {
//       try {
//         const query = `https://www.omdbapi.com/?apikey=70731d2&page=${page}`;
//         if (search.value) {
//           query += `&s=${search.value}`;
//         }
//         if (year.value) {
//           query += `&y=${year.value}`;
//         }
//         if (type.value) {
//           query += `&type=${type.value}`;
//         }
//         const response = await fetch(query);
//         const movies = await response.json();
//         let omdbMovies = document.getElementById("omdbMovies");
//     omdbMovies.innerHTML = '';  // Clear previous results

//     if (movies.Search) {
//         totalResults = parseInt(movies.totalResults);  // Get total number of results
//         movies.Search.map((movie) => {
//             let movieCard = document.createElement('div');
//             movieCard.className = 'movie-card';

//             let title = document.createElement('h1');
//             title.textContent = movie.Title;
//             movieCard.append(title);

//             let poster = document.createElement('img');
//             poster.src = movie.Poster === "N/A" ? "https://media.tenor.com/IHdlTRsmcS4AAAAM/404.gif" : movie.Poster;
//             poster.alt = movie.Title;
//             poster.width = 100;
//             poster.height = 100;
//             movieCard.append(poster);

//             let year = document.createElement('h5');
//             year.textContent = movie.Year;
//             movieCard.append(year);

//             let id = document.createElement('h6');
//             id.innerText = `IMDB ID: ${movie.imdbID}`;
//             movieCard.append(id);

//             movieCard.addEventListener('click', () => {
//                 window.location.href = `index2.html?imdbID=${movie.imdbID}`;
//             });

//             omdbMovies.append(movieCard);
//         });

//         // Display pagination if more than 10 results
//         if (totalResults > 10) {
//             createPagination(totalResults);
//         }
//     } else {
//         omdbMovies.innerHTML = `<p style="color:white">No results found</p>`;
//         alert("No results found");
//     }
//       } catch (error) {
//         console.error('Error fetching movies:', error);
//       }
//     }, 500);
//   }

// Create pagination with arrows
function createPagination(totalResults) {
    let totalPages = Math.ceil(totalResults / 10);  // Calculate the total number of pages
    let pagination = document.getElementById('pagination');
    pagination.innerHTML = '';  // Clear previous pagination

    // Create "Previous" button
    let prevButton = document.createElement('button');
    prevButton.textContent = '<';
    prevButton.className = 'page-button';
    prevButton.disabled = currentPageSet === 1;  // Disable if we're on the first set
    prevButton.addEventListener('click', () => {
        if (currentPageSet > 1) {  // Ensure we don't go below 1
            currentPageSet--;
            currentPage = (currentPageSet - 1) * pagesPerSet + 1;  // Adjust currentPage to the first page of the previous set
            renderPageNumbers(totalPages);
            getmovies(currentPage);  // Fetch the movies for the first page of the previous set
        }
    });
    pagination.append(prevButton);

    // Create page number buttons
    renderPageNumbers(totalPages);  // Only render the page numbers, not navigation buttons

    // Create "Next" button
    let nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.className = 'page-button';
    nextButton.disabled = currentPageSet * pagesPerSet >= totalPages;  // Disable if we're on the last set
    nextButton.addEventListener('click', () => {
        if (currentPageSet * pagesPerSet < totalPages) {  // Ensure we don't exceed the total pages
            currentPageSet++;
            currentPage = (currentPageSet - 1) * pagesPerSet + 1;  // Adjust currentPage to the first page of the next set
            renderPageNumbers(totalPages);
            getmovies(currentPage);  // Fetch the movies for the first page of the next set
        }
    });
    pagination.append(nextButton);
}

// Render the page numbers based on the current set
function renderPageNumbers(totalPages) {
    let pagination = document.getElementById('pagination');
    let startPage = (currentPageSet - 1) * pagesPerSet + 1;
    let endPage = Math.min(startPage + pagesPerSet - 1, totalPages);

    // Clear only the page numbers, not the navigation buttons
    Array.from(pagination.querySelectorAll('.page-number')).forEach(el => el.remove());

    // Add page numbers in order from startPage to endPage
    for (let i = startPage; i <= endPage; i++) {
        let pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = 'page-button page-number';
        
        // Highlight the current page
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        
        pageButton.addEventListener('click', () => {
            currentPage = i;
            getmovies(currentPage);
            renderPageNumbers(totalPages);  // Re-render pagination after clicking a page
        });

        pagination.appendChild(pageButton);  // Add page number buttons
    }
}

async function fetchSuggestions() {
    let query = `https://www.omdbapi.com/?apikey=70731d2&s=${search.value}`;

    if (search.value) {
        let response = await fetch(query);
        let movies = await response.json();

        suggestions.innerHTML = '';
        if (movies.Search) {
            movies.Search.forEach((movie) => {
                let suggestionItem = document.createElement('div');
                suggestionItem.textContent = movie.Title;
                suggestionItem.addEventListener('click', () => {
                    search.value = movie.Title;
                    suggestions.innerHTML = '';
                    getmovies();
                });
                suggestions.appendChild(suggestionItem);
            });
        }
    } else {
        suggestions.innerHTML = ''; 
    }
}

document.addEventListener('click', (event) => {
    if (!suggestions.contains(event.target) && event.target !== search) {
        suggestions.innerHTML = '';
    } else {
        fetchSuggestions();
    }
});

function home() {
    window.location.replace("user.html");
}

const loggedInUserName = localStorage.getItem('loggedInUser');

if (loggedInUserName) {
    document.getElementById('welcome-message').textContent = `Welcome, ${loggedInUserName}`;
}

function menus() {
    let options = document.getElementById("options");
    let menu = document.getElementById("menu");
    let heading = document.getElementById("heading");

    if (options.style.display == "none") {
        options.style.display = "block";
        menu.style.marginTop = "250px";
        options.style.textAlign = "center";
        options.style.marginLeft = "-40px";
        menu.style.width = "210px";
        heading.style.marginLeft = "100px";
    } else {
        options.style.display = "none";
    }
}
