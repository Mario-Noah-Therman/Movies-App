function getMovieFromAPI(fetch("https://imdb8.p.rapidapi.com/auto-complete?q=game%20of%20thr", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": "9a097b1da5msh5f9f374991b6290p104490jsn8c8c918108cd"
    }
})
    .then(response => response.json())
    .then(movie => {
        movie.forEach(movie => {
        let movieLibrary =  {
            title: movie.mTitle
            rating: movie.mRating
            poster: movie.mImg
            year: movie.mYear
            genre: movie.mGenre
            directors: movie.mDirectors
            actor:  movie.mActors
            id: movie.id
        }
        });


    })
    .catch(err => {
        console.error(err);
    });)
