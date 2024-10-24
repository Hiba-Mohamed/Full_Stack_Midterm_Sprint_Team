const {
  getRandomMoviesByGenre,
  getTopRatedMovies,
  formatMovieData,
  getRandomGenre,
  generateMovieReport,
  getRandomNumberOfMovies,
} = require("../../utils/movieUtils");

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

      describe('selectRandomMovieId', () => {
  //  Select a random movie id
  // A valid movie is returned
          test("Selects a random movie that is included in the ", () => {});
          test("The random movie selected is valid", () => {});

      });
});

getRandomMoviesByGenre;
