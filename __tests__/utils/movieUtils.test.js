const {
  getRandomMoviesByGenre,
  getTopRatedMovies,
  formatMovieData,
  getRandomGenre,
  generateMovieReport,
  getRandomNumberOfMovies,
  selectRandomMovieId,
} = require("../../utils/movieUtils");
const data = require('../../utils/data')
const movies = data.Movies;
const availableMoviesNumber = movies.length;

describe("Movie Utility Functions", () => {

  //     describe('getMoviesByGenre', () => {

  //     });

  describe("getTopRatedMovies", () => {
    test("Returns an Array of the specified length", () => {
      const array = getTopRatedMovies(15);
      expect(array.length).toBe(15);
    });
    test("Organize the array in descending order", () => {
      const array = getTopRatedMovies(15);
      for (let i = 0; i < array.length - 1; i++) {
        expect(array[i].rating).toBeGreaterThanOrEqual(array[i + 1].rating);
      }
    });
  });

  // describe('getMovieDetailsById', () => {

  // });

  describe("selectRandomMovieId", () => {
    const randomMovieId = selectRandomMovieId(availableMoviesNumber);
    console.log(randomMovieId)
    const randomMovie = movies.find((movie) => movie.id === randomMovieId);
    console.log(randomMovie)
    test("Selects a random movie id that is included in the avaliable movies", () => {
      expect(randomMovieId).toBeGreaterThanOrEqual(0);
      expect(randomMovieId).toBeLessThan(availableMoviesNumber - 1);
    });
    test("The random movie selected is valid", () => {
        expect(randomMovie).toBeDefined();
        expect(randomMovie.id).toBe(randomMovieId)

    });
  });
});

getRandomMoviesByGenre;
