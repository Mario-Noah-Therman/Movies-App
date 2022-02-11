let url = 'https://gelatinous-cord-feather.glitch.me/movies';

//will display and error Message on the html page
function errorMessage(error) {
    console.log('error')
    //append some error message to html page
}

//this function adds tables and stuff to html doc
let appendToHtml = (title, rating, poster, year, genre, directors, actors, movieId) => {
    console.log(movieId)
    return `
    <div class="card h-100">
    ${hasPoster(poster)}
        <div class="card-body text-center">
        <h5>${isUndefined(title)}</h5>
        <p class="card-text">
        ${isUndefined(rating)}<br>
        ${isUndefined(year)}<br>
        ${isUndefined(genre)}<br>
        ${isUndefined(directors)}<br>
        ${isUndefined(actors)}<br>
        </p>
    </div>
    <div class="card-footer">
    <button id="${movieId}" class="btn btn-sm btn-primary">Test</button>
<!--        <button  id= "editPost" class= " btn btn-sm btn-secondary mx-1">Edit</button>-->
        <button  id="deletePost" class=" btn btn-sm btn-danger mx-1">Remove</button>
    </div>
 </div>
`
}

function buttonClick(movieId) {
    $('#' + movieId).click(function (e) {
        e.preventDefault()
        console.log('clicked' + movieId)
    })
}

let isUndefined = (content) => {
    if (content === undefined) {
        return ''
    } else {
        return content
    }
}

let hasPoster = poster => {
    if (poster === undefined) {
        return ''
    } else {
        return `<img src="${poster}" class="card-img-top" style="width=200; height=300px;"  alt="...">`
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
                let id = movie.id

                function one() {
                    return new Promise(function(resolve, reject) {
                        setTimeout(function() {
                            $('#data').append(appendToHtml(title, rating, poster, year, genre, directors, actors, id))
                            resolve();
                        }, 1000);
                    })
                }
                function two() {
                    $("#deletePost").click(function () {
                        deletePost();
                    });
                }
                one().then(two)
            })
        })
        .catch(error => errorMessage(error));
}
$("#addPost").click(function (e) {
    e.preventDefault()
    data = { mTitle: $("#inputTitle").val(),
         mYear: $("#inputYear").val(),
         mGenre: $("#inputGenre").val(),
         mActors: $("#inputActors").val(),
         mImg: $("#inputImg").val(),
         mRating: $("#inputRating").val()}
        console.log(data)
    addNewMovie(data)
});


//this function adds a new movie by post request
function addNewMovie(data) {
    // data = {title: 'movie-title'};

    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            $('#data').append(appendToHtml(title, rating, poster, year, genre, directors, actors, id))
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


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
        `<div class="text-center">
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>`
    $('#loading').append(spinner);
}

//clears loading spinner
function clearLoading() {
    $('#loading').empty();
}

/*HTML Manipulation*/
loading()

function loadingInterval() {
    $(document).ready(function () {
        console.log('cleared');
        clearLoading()
        moviesRequest();
    })
    //where we will write functionality.
}
setTimeout(loadingInterval, 0);


function deletePost(id) {
    fetch(url + `/${id}`  ,{
        method: 'DELETE',
    }).then((response) => response.json())
        .then((json) => console.log(json));

}

function edit(id) {
    fetch(url + `/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: 'foo',
            body: 'bar',
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

$("#deletePost").click(function () {
    deletePost();
});

$("#editPost").click(function () {
    edit();
});




