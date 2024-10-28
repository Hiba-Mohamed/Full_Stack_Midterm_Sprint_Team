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
// Route to redirect to a random movie using res.locals.randomMovieID
app.get("/movie", (req, res) => {
  // Add 1 to ensure the ID falls within the valid range (1 to 28)
  const randomMovieId = res.locals.randomMovieID + 1;

  // Redirect to the movie details page with the random ID
  res.redirect(`/movie/${randomMovieId}`);
});

// Movie page route: Displays detailed information about a specific movie
app.get("/movie/:id", (req, res) => {
  const movieId = req.params.id;
  const movie = getMovieDetailsById(movieId);

  // If movie is not found, handle the error
  if (!movie) {
    return res
      .status(404)
      .send("Invalid movie ID. Please choose a valid ID.");
  }

  // Get all movies of the same genre
  let genreMovies = getMoviesByGenre(movie.genre);

  // Exclude the current movie from recommendations
  genreMovies = genreMovies.filter((m) => m.id !== movie.id);

  // Shuffle and select up to 3 random recommendations
  const shuffledMovies = genreMovies.sort(() => 0.5 - Math.random());
  const recommendations = shuffledMovies.slice(0, 3);

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
