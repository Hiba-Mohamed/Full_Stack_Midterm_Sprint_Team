const express = require("express");
const path = require("path");
const {
  getTopRatedMovies,
  getMoviesByGenre,
  getMovieDetailsById,
  selectRandomMovieId,
  getRandomNumberOfMovies,
} = require("./utils/movieUtils");
const { Movies, Genres } = require("./utils/data");
const numberOfAvailableMovies = Movies.length;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

// Middleware to set the randomMovieId and pass it to header directly
app.use((req, res, next) => {
  res.locals.randomMovieID = selectRandomMovieId(numberOfAvailableMovies);
  next();
});

app.get("/", (request, response) => {
  const randomNineMoviesArray = getRandomNumberOfMovies(9);
  response.render("index", { randomNineMoviesArray });
});

app.get("/topRated", (request, response) => {
  const topRatedFifteen = getTopRatedMovies(15);
  response.render("topRated", { topRatedFifteen });
});

// Movie page route: Displays detailed information about a movie
app.get("/movie/:id", (req, res) => {
  const movieId = req.params.id;
  const movie = getMovieDetailsById(movieId);

  if (!movie) {
    return res.status(404).send("Movie not found");
  }

  // Filter movies by the same genre and exclude the current movie
  const recommendations = Movies.filter(
    (m) => m.genre === movie.genre && m.id !== movie.id
  );

  // Randomly select three recommendations if more than three are available
  const randomRecommendations =
    recommendations.length > 3
      ? recommendations.sort(() => 0.5 - Math.random()).slice(0, 3)
      : recommendations;

  res.render("movie", {
    movie: movie,
    recommendations: randomRecommendations,
  });
});

//Add remaining routes here

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
