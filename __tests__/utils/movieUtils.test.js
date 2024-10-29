const {
  getTopRatedMovies,
  getMoviesByGenre,
  getMovieDetailsById,
  selectRandomMovieId,
} = require("../../utils/movieUtils");
const data = require("../../utils/data");
const movies = data.Movies;
const availableMoviesNumber = movies.length;

describe("Movie Utility Functions", () => {
  describe("getMoviesByGenre", () => {
    const genre = "Action"; // Example genre for testing
    const numberOfMovies = 5; // Number of movies to retrieve

    test("Specifying a genre will successfully return x movies from that genre", () => {
      const moviesByGenre = getMoviesByGenre(genre, numberOfMovies);
      expect(moviesByGenre.length).toBe(numberOfMovies);

      // Check if all returned movies belong to the specified genre
      moviesByGenre.forEach((movie) => {
        expect(movie.genre).toBe(genre);
      });
    });

    test("If the genre has no movies, then an appropriate response is returned", () => {
      const moviesByGenre = getMoviesByGenre(
        "Nonexistent Genre",
        numberOfMovies
      );
      expect(moviesByGenre).toEqual([]);
    });
  });

  describe("getTopRatedMovies", () => {
    test("Returns an Array of the specified length", () => {
      const array = getTopRatedMovies(15);
      expect(array.length).toBe(15);
    });
    test("Organize the array in descending order", () => {
      const array = getTopRatedMovies(15);
      for (let i = 0; i < array.length - 1; i++) {
        expect(array[i].rating).toBeGreaterThanOrEqual(
          array[i + 1].rating
        );
      }
    });
  });

  describe("getMovieDetailsById", () => {
    test("If the ID is valid, a valid movie is returned", () => {
      const validId = 1;
      const movie = getMovieDetailsById(validId);
      expect(movie).toBeDefined();
      expect(movie.id).toBe(validId);
    });

    test("If the ID is invalid, an appropriate response is returned", () => {
      const invalidId = 0;
      const movie = getMovieDetailsById(invalidId);
      expect(movie).toBeNull();
    });
  });

  describe("selectRandomMovieId", () => {
    const randomMovieId = selectRandomMovieId(availableMoviesNumber);
    // console.log(randomMovieId);
    const randomMovie = movies.find((movie) => movie.id === randomMovieId);
    // console.log(randomMovie);
    test("Selects a random movie id that is included in the avaliable movies", () => {
      expect(randomMovieId).toBeGreaterThanOrEqual(0);
      expect(randomMovieId).toBeLessThan(availableMoviesNumber - 1);
    });
    test("The random movie selected is valid", () => {
      expect(randomMovie).toBeDefined();
      expect(randomMovie.id).toBe(randomMovieId);
    });
  });
});


