let url = 'https://gelatinous-cord-feather.glitch.me/movies';

//will display and error Message on the html page
function errorMessage(error) {
    console.log('error')
}

//this function adds tables and stuff to html doc
let appendToHtml = (title, rating, poster, year, genre, directors, actors) => {
    return `
<div>${isUndefined(title)}</div>
<div>${isUndefined(rating)}</div>
<div>${hasPoster(poster)}</div>
<div>${isUndefined(year)}</div>
<div>${isUndefined(genre)}</div>
<div>${isUndefined(directors)}</div>
<div>${isUndefined(actors)}</div>
`
}

let isUndefined = (content) =>{
    if(content === undefined) {
        return ''
    } else {
        return content
    }
}
let hasPoster = poster => {
    if(poster === undefined){
        return ''
    } else {
        return `<img src="${poster}">`
    }
}

//this function does the fetch request from the API to receive movie info
function moviesRequest() {
    /*  loading();*/
    fetch(url)
        .then(response => response.json())
        .then(movies => {
            console.log(movies)
            /*  clearLoading();*/
            movies.forEach(movie => {
                //we created our own library
                    let title = movie.title
                    let rating = movie.rating
                    let poster = movie.poster
                    let year = movie.year
                    let genre = movie.genre
                    let directors = movie.directors
                    let actors = movie.actors
                $('#data').append(appendToHtml(title, rating, poster, year, genre, directors, actors))
            })
        })
        .catch(error => errorMessage(error));
}

moviesRequest();

//this function adds a new movie by post request
function addNewMovie(data) {
    data = {title: 'movie-title'};

    fetch(url, {
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
//when you click the button, it gets the user data into the POST request.
$('#addNewMovie').click( e => {
    e.preventDefault()
    let data = $('#movieInfo').val();
    addNewMovie(data);
});

//add a scroll animation to the page
/*let scrollTarget = document.getElementById('targetScroll');
let scrollTarget2 = document.getElementById('targetScroll2')
window.document.addEventListener('scroll', function () {
    if (window.scrollY > scrollTarget.scrollTop) {
        scrollTarget.classList.add('curtain_left');
        scrollTarget2.classList.add('curtain_right');
    } else if (window.scrollY < 10) {
        scrollTarget.classList.remove('curtain_left');
        scrollTarget2.classList.remove('curtain_right');
    }
})*/

let addRippleEffect = e => {
    let btn = e.currentTarget;
    btn.classList.add('ripple');
    let ripple = btn.getElementsByClassName('ripple');
    if (ripple) {
        ripple.remove()
        console.log('removed')

    }
}

//adds animation to all buttons on the DOM
const buttons = document.getElementsByTagName('button');
for (const button of buttons) {
    button.addEventListener('click', addRippleEffect)
}

//makes a loading spinner via bootstrap.
function loading() {
    let spinner =
        `<div class="spinner-border" role="status">
<span class="sr-only">Loading...</span>
</div>`
    $('#loading').append(spinner);
}

//clears loading spinner
function clearLoading() {
    $('#loading').text('');
}

/*HTML Manipulation*/
function test() {
    $('.header-two').text('Hello Visiters')
}

setInterval(test, 6000);
