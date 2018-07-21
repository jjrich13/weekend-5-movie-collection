app.controller('DialogController', ['MoviesService', '$mdDialog', function (MoviesService, $mdDialog) {
    let self = this;

    //variables
    
    self.movieToEdit = MoviesService.movieToEdit;

    //defined functions
    self.editMovie = MoviesService.editMovie;

    

    //called Functions
    self.getMovies();
    self.getGenresList();
}]);