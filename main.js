let url = 'https://codeup-json-server.glitch.me/movies';

//will display and error Message on the html page
function errorMessage(error) {
    console.log(error)
}

//this function adds tables and stuff to html doc
let appendToHtml = (movieLibrary) => {
    return `<div>${movieLibrary.title}</div>`
}

//this function does the fetch request from the API to recieve movie info
function moviesRequest() {

    fetch(url)
        .then(response => response.json())
        .then(movies => {
            console.log(movies)
            movies.forEach(movie => {
                //we created our own library
                let movieLib = {
                    title: movie.title,
                    rating: movie.rating,
                    poster: movie.poster,
                    year: movie.year,
                    genre: movie.genre,
                    directors: movie.directors,
                    actors: movie.actors
                }
                //append to html here
/*                $('data').append(appendToHtml(movieLib))*/
            })
        })
        .catch(error => errorMessage(error));


}

moviesRequest(); //for testing

//this function adds a new movie by post request
function addNewMovie() {
    let data = {title: 'movie-title'};

    fetch('https://example.com/profile', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
//add a scroll animation to the page
    let scrollTarget = document.getElementById('targetScroll');
    let scrollTarget2 = document.getElementById('targetScroll2')
    window.document.addEventListener('scroll', function () {
        if(window.scrollY > scrollTarget.scrollTop) {
            console.log('active');
            scrollTarget.classList.add('curtain_left');
            scrollTarget2.classList.add('curtain_right');
        } else if (window.scrollY < 50){
            console.log('removed');
            scrollTarget.classList.remove('curtain_left');
            scrollTarget2.classList.remove('curtain_right');
        }
    })
