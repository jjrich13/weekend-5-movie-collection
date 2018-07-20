app.controller('MoviesController',['MoviesService', function(MoviesService){
    let self = this;

    self.message = MoviesService.message;
    
    self.getDb_id = MoviesService.getDb_id;

    self.addMovie = MoviesService.addMovie;

    self.movies = MoviesService.movies;

    self.getMovies = MoviesService.getMovies;

    self.getMovies();

    self.imageUrlBase = MoviesService.imageUrlBase;

    self.title ='Movies'
}]);