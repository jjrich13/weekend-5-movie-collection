app.controller('GenresController',['MoviesService', '$mdDialog', function(MoviesService, $mdDialog){
    let self = this;

    //variables
    self.message = MoviesService.message;
    self.genres = MoviesService.genres;
    self.title ='Genres';

    //defined functions
    self.addGenre = MoviesService.addGenre;
    self.getGenres = MoviesService.getGenres;
    self.deleteGenre = MoviesService.deleteGenre;

    //called functions
    self.getGenres();
    

    self.showConfirm = function (ev, genre) {
        // Appending dialog to document.body to cover sidenav in docs app
        console.log('clicked test');

        let confirm = $mdDialog.confirm()
            .title('Remove Genre and related Movies from your collection?')
            .textContent('This will remove both the Genre and all movies in this Genre. This cannot be undone.')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Delete Genre and its Movies')
            .cancel('No, Keep \'em');

        $mdDialog.show(confirm).then(function () {
            self.deleteGenre(genre);
        });
    };

}]);