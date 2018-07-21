app.controller('GenresController',['MoviesService', '$mdDialog', function(MoviesService, $mdDialog){
    let self = this;

    //variables
    self.message = MoviesService.message;
    self.genres = MoviesService.genres;
    self.title ='Genres';

    //defined functions
    self.addGenre = MoviesService.addGenre;
    self.getGenres = MoviesService.getGenres;

    //called functions
    self.getGenres();
    

    self.showConfirm = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        console.log('clicked test');
        
        let confirm = $mdDialog.confirm()
              .title('Would you like to delete your debt?')
              .textContent('All of the banks have agreed to forgive you your debts.')
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Please do it!')
              .cancel('Sounds like a scam');
    
        $mdDialog.show(confirm).then(function() {
          self.status = 'You decided to get rid of your debt.';
        }, function() {
          self.status = 'You decided to keep your debt.';
        });
      };
}]);