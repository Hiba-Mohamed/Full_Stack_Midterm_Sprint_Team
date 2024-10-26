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

  // Use getMoviesByGenre to get up to 3 movies of the same genre
  const genreMovies = getMoviesByGenre(movie.genre, 3);

  // Exclude the current movie from recommendations
  const recommendations = genreMovies.filter((m) => m.id !== movie.id);

  // Render the movie details page with the movie and recommendations data
  res.render("movie", { movie, recommendations });
});

// Route for upcoming movies
app.get("/upcomingMovies", (req, res) => {
  const upcomingMovies = Movies.filter(
    (movie) => movie.releaseYear > 2023
  );

  const numberOfMoviesToShow = Math.min(5, upcomingMovies.length);
  const selectedMovies = new Set();

  while (selectedMovies.size < numberOfMoviesToShow) {
    const randomIndex = selectRandomMovieId(upcomingMovies.length);
    selectedMovies.add(upcomingMovies[randomIndex]);
  }

  const randomUpcomingMovies = Array.from(selectedMovies);

  res.render("upcomingMovies", {
    topUpcomingMovies: randomUpcomingMovies,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
