let url = 'https://codeup-json-server.glitch.me/movies';

//will display and error Message on the html page
function errorMessage(error) {
    console.log(error)
}

//this function adds tables and stuff to html doc
let appendToHtml = (htmlLocation) => {
    return (
        `<div>
            <!--stuff to append goes here-->
        </div>`
    )
}

//this function does the fetch request from the API to recieve movie info
function moviesRequest() {

    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => errorMessage(error));


}

moviesRequest(); //for testing

//this function adds a new movie by post request
function addNewMovie() {
    let data = { title: 'movie-title' };

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