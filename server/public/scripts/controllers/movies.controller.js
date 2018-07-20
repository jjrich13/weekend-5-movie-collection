app.controller('MoviesController',['MoviesService', function(MoviesService){
    let self = this;

    self.genresList = MoviesService.genresList;

    self.message = MoviesService.message;

    self.getDb_id = MoviesService.getDb_id;

    self.addMovie = MoviesService.addMovie;

    self.movies = MoviesService.movies;

    self.getGenresList = MoviesService.getGenresList;

    self.getMovies = MoviesService.getMovies;

    self.getMovies();

    self.getGenresList();

    self.imageUrlBase = MoviesService.imageUrlBase;

    self.title ='Movies'
}]);