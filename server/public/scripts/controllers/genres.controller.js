app.controller('GenresController',['MoviesService', function(MoviesService){
    let self = this;
    console.log('GenresController has loaded');
    self.message = MoviesService.message;
    

    self.title ='Genres'
}]);