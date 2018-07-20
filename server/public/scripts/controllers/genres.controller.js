app.controller('GenresController',['MoviesService', function(MoviesService){
    let self = this;
    console.log('GenresController has loaded');
    self.message = MoviesService.message;
    self.genres = MoviesService.genres;

    self.addGenre = MoviesService.addGenre;

    self.getGenres = MoviesService.getGenres;

    self.getGenres();
    

    self.title ='Genres'
}]);