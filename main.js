let url = 'https://gelatinous-cord-feather.glitch.me/movies';

//will display and error Message on the html page
function errorMessage(error) {
    console.log('error')
    //append some error message to html page
}

//this function adds tables and stuff to html doc
let appendToHtml = (title, rating, poster, year, genre, directors, actors, movieId) => {

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
<!-- Button trigger modal -->
<button type="button" class="btn btn-sm btn-secondary" data-toggle="modal" data-target="#modalEdit">
    Edit
</button>

<!-- Modal -->
<div class="modal fade" id="modalEdit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Movie</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="editTitle">Title</label>
                            <input type="text" class="form-control" id="editTitle">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="editYear">Year</label>
                            <input type="text" class="form-control" id="editYear">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="editGenre">Genre's</label>
                        <input type="text" class="form-control" id="editGenre" placeholder="All the Genre's">
                    </div>
                    <div class="form-group">
                        <label for="editActors">Actors</label>
                        <input type="text" class="form-control" id="editActors" placeholder="Who was in it?">
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="editImg">Movie Thumbnail</label>
                            <input type="text" class="form-control" id="editImg" placeholder="Drop movie image URL here!">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="editRating">Rating</label>
                            <select id="editRating" class="form-control">
                                <option selected>Choose...</option>
                                <option>Y-7</option>
                                <option>G</option>
                                <option>PG</option>
                                <option>PG-13</option>
                                <option>R</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="editData${movieId}" data-dismiss="modal">Save changes</button>
            </div>
        </div>
    </div>
</div>

        <button  id="deletePost${movieId}" class=" btn btn-sm btn-danger mx-1">Remove</button>
    </div>
 </div>
`
}

//this function test purposes on;y
/*function buttonClick(movieId) {
    $('#' + movieId).click(function (e) {
        e.preventDefault()
        console.log('clicked' + movieId)
    })
}*/

//this function checks if the content we pull has content, if not; then we return an empty string
let isUndefined = (content) => {
    if (content === undefined) {
        return ''
    } else {
        return content
    }
}
//this function checks to see if we have a poster/thumbnail for the movie
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
                let director = movie.director
                let actors = movie.actors
                let id = movie.id

                $('#data').empty();

                function one() {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            $('#data').append(appendToHtml(title, rating, poster, year, genre, director, actors, id))
                            resolve();
                        }, 1000);
                    })
                }

                function two() {
                    $("#deletePost" + id).click(function () {
                        deletePost(id);
                    });
                    $("#editData" + id).click(function (e) {
                        e.preventDefault()
                        data = {
                            title: $("#editTitle").val(),
                            year: $("#editYear").val(),
                            genre: $("#editGenre").val(),
                            actors: $("#editActors").val(),
                            poster: $("#editImg").val(),
                            rating: $("#editRating").val()
                        }
                        //for testing
                        /*    console.log(data)*/
                        edit(data, id)
                    });
                }
                one().then(two)
            })
        })
        .catch(error => errorMessage(error));
}

//when you click the 'add' button, we add a new post
$("#addPost").click(function (e) {
    e.preventDefault()
    data = {
        title: $("#inputTitle").val(),
        year: $("#inputYear").val(),
        genre: $("#inputGenre").val(),
        actors: $("#inputActors").val(),
        poster: $("#inputImg").val(),
        rating: $("#inputRating").val()
    }
    //for testing
    /*    console.log(data)*/
    addNewMovie(data)
});


//this function adds a new movie by post request
function addNewMovie(data) {
    // data = {title: 'movie-title'};
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then( () => {
            moviesRequest();
/*            console.log(data);*/
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

//adds ripple effect to buttons
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
/*const buttons = document.getElementsByTagName('button');
for (const button of buttons) {
    button.addEventListener('click', addRippleEffect)
}*/

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

//loads the page
setTimeout(loadingInterval, 0);

//this function deletes posts from wherever we call it
function deletePost(id) {
    fetch(url + `/${id}`, {
        method: 'DELETE',
    }).then((response) => response.json())
        .then((json) => moviesRequest());

}


//this edits the current post
function edit(data ,id) {
    fetch(url + `/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => moviesRequest());
}






