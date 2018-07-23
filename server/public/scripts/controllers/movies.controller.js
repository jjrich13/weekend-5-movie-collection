app.controller('MoviesController', ['MoviesService', '$mdDialog', function (MoviesService, $mdDialog) {
    let self = this;

    //variables
    self.genresList = MoviesService.genresList;
    self.message = MoviesService.message;
    self.movies = MoviesService.movies;
    self.imageUrlBase = MoviesService.imageUrlBase;
    self.movieToEdit = MoviesService.movieToEdit;
    self.detailMode = MoviesService.detailMode;

    //defined functions
    self.getDb_id = MoviesService.getDb_id;
    self.addMovie = MoviesService.addMovie;
    self.getGenresList = MoviesService.getGenresList;
    self.getMovies = MoviesService.getMovies;
    self.removeMovie = MoviesService.removeMovie;
    self.editDialog = MoviesService.editDialog;
    self.editMovie = MoviesService.editMovie;
    self.getDetails = MoviesService.getDetails;
    

    self.showConfirm = function (ev, movie) {

        let confirm = $mdDialog.confirm()
            .title('Remove this movie from your collection?')
            .textContent('This cannot be undone.')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Yeah, remove it')
            .cancel('No let\'s keep it');

        $mdDialog.show(confirm).then(function () {
            self.removeMovie(movie);
        });
    };

    

    

    //called Functions
    self.getMovies();
    self.getGenresList();
}]);