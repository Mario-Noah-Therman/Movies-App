let url = 'https://codeup-json-server.glitch.me/movies';

//will display and error Message on the html page
function errorMessage(error) {
    console.log(error)
}

//this function adds tables and stuff to html doc
let appendToHtml = htmlId => {
    return (
        `<div>
            {/*stuff to append*/}
        </div>`
    )
}




fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => errorMessage(error));


