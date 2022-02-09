let url = 'https://codeup-json-server.glitch.me/movies';

//will display and error Message on the html page
function errorMessage(error) {
    console.log(error)
}

//this function adds tables and stuff to html doc
let appendToHtml = (htmlLocation) => {
    return (
        `<div>
            {/*stuff to append*/}
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
moviesRequest();

//this function adds a new movie by post request
function addNewMovie() {

}