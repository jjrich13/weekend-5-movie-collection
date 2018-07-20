app.controller('GenresController',['MoviesService', function(MoviesService){
    let self = this;

    //variables
    self.message = MoviesService.message;
    self.genres = MoviesService.genres;
    self.title ='Genres'

    //defined functions
    self.addGenre = MoviesService.addGenre;
    self.getGenres = MoviesService.getGenres;

    //called functions
    self.getGenres();
    
}]);