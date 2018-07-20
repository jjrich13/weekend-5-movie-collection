app.controller('MoviesController',['MoviesService', function(MoviesService){
    let self = this;

    //variables
    self.genresList = MoviesService.genresList;
    self.message = MoviesService.message;
    self.movies = MoviesService.movies;
    self.imageUrlBase = MoviesService.imageUrlBase;
    self.title ='Movies'

    //defined functions
    self.getDb_id = MoviesService.getDb_id;
    self.addMovie = MoviesService.addMovie;
    self.getGenresList = MoviesService.getGenresList;
    self.getMovies = MoviesService.getMovies;
    self.removeMovie = MoviesService.removeMovie;

    //called Functions
    self.getMovies();
    self.getGenresList();
}]);