const express = require('express');
const path = require('path');
const { getTopRatedMovies, getMoviesByGenre, getMovieDetailsById, selectRandomMovieId,getRandomNumberOfMovies } = require('./utils/movieUtils');
const { Movies, Genres } = require('./utils/data');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/', (request, response) => {
    const randomNineMoviesArray = getRandomNumberOfMovies(9)
    console.log(randomNineMoviesArray);
    response.render('index', {randomNineMoviesArray});
});

app.get("/topRated", (request, response) => {
  response.render("topRated");
});

app.get('/movie/:id', (request, response) => {
    //For use with links like: /movie/1
    const movieId = request.params.id;
});

//Add remaining routes here



const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
