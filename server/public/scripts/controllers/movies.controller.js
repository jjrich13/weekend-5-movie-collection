app.controller('MoviesController',['MoviesService', function(MoviesService){
    let self = this;
    console.log('MoviesController has loaded');
    self.message = MoviesService.message;
    

    self.title ='Movies'
}]);