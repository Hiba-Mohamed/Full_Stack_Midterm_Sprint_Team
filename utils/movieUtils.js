const { Movies, Genres } = require("./data");

/**
 * Get `x` movies by genre
 * @param {string} genre - The genre of the movies
 * @param {number} x - The number of movies to retrieve
 * @returns {Array.<object>} - An array of movies matching the genre
 */
function getMoviesByGenre(genre, x) {
  // Filter movies by the specified genre
  const moviesByGenre = Movies.filter((movie) => movie.genre === genre);

  // Return the first `x` movies from the filtered results
  return moviesByGenre.slice(0, x);
}

/**
 * Get the `x` top rated movies, ordered by rating
 * @param {number} x - The number of top-rated movies to retrieve
 * @returns {Array.<Movies>} - An array of top-rated movies
 */
function getTopRatedMovies(numberWanted) {
  const allMoviesOrderedByRatingArray = Movies.sort(
    (a, b) => b.rating - a.rating
  );
  const orderedMoviesSpecifiedNumber = allMoviesOrderedByRatingArray.slice(
    0,
    numberWanted
  );
  return orderedMoviesSpecifiedNumber;
}

/**
 * Get the details of a movie by its ID
 * @param {number} id - The ID of the movie
 * @returns {Object|null} - The movie object
 */
function getMovieDetailsById(id) {
  return Movies.find((movie) => movie.id === Number(id)) || null;
}

function getRandomNumberOfMovies(numberWanted) {
  let randomMovieIdArray = [];
  let randomMoviesArray = [];
  while (randomMovieIdArray.length < numberWanted) {
    const randomMovieId = Math.floor(Math.random() * Movies.length);
    if (!randomMovieIdArray.includes(randomMovieId)) {
      randomMovieIdArray.push(randomMovieId);
    }
  }
  randomMoviesArray = randomMovieIdArray.map((id) => Movies[id]);
  return randomMoviesArray;
}

/**
 * Select a random movie ID
 * @returns {number} - A random movie ID
 */
function selectRandomMovieId(numberOfAvailableMovies) {
  // Ensure it returns a random integer between 1 and numberOfAvailableMovies (inclusive)
  return Math.floor(Math.random() * numberOfAvailableMovies);
}

// Export the functions to be used in other modules
module.exports = {
  getMoviesByGenre,
  getTopRatedMovies,
  getMovieDetailsById,
  selectRandomMovieId,
  getRandomNumberOfMovies,
};
