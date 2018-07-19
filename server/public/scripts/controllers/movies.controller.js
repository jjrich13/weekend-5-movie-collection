app.controller('MoviesController',['MoviesService', function(MoviesService){
    let self = this;
    console.log('MoviesController has loaded');
    self.message = MoviesService.message;
    
    self.getDb_id = MoviesService.getDb_id;

    self.addMovie = MoviesService.addMovie;

    self.title ='Movies'
}]);