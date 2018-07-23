app.service('MoviesService', ['$http', '$mdDialog', function ($http, $mdDialog) {
    let self = this;

    self.movies = {
        list: []
    };

    self.genres = {
        list: []
    };

    self.genresList = {
        list: []
    };

    self.details = {};


    

    //to change size, change the number:
    self.imageUrlBase = 'http://image.tmdb.org/t/p/w300';

    //this function is called on the Add Movie Button Click
    //I did it like this because the API call takes too long and the order of operations was getting screwed up because the code was moving on before the response came back
    self.getDb_id = function (newMovie) {
        $http.get(
            `https://api.themoviedb.org/3/search/movie?api_key=7ba5feeb1c69e54538affe7c9eea0403&language=en-US&query=${newMovie.title}&page=1&include_adult=false`
        ).then(function (result) {
            newMovie.db_id = result.data.results[0].id;
            newMovie.image_path = result.data.results[0].poster_path;
            self.getDetails(newMovie);
        }).catch(function (err) {
            console.log(err);
            alert('Error');
        })
    };

    self.getDetails = function (newMovie) {

        //this is two API get calls, nested, one inside the other, did it this way because it screws up the variable values with how long the API takes to respond
        $http.get(
            `https://api.themoviedb.org/3/movie/${newMovie.db_id}?api_key=7ba5feeb1c69e54538affe7c9eea0403&language=en-US`
        ).then(function (result) {
            self.details.synopsis = result.data.overview;
            self.details.revenue = result.data.revenue;
            self.details.runtime = result.data.runtime;
            self.details.budget = result.data.budget;
            $http.get(
                `https://api.themoviedb.org/3/movie/${newMovie.db_id}/credits?api_key=7ba5feeb1c69e54538affe7c9eea0403`
            ).then(function (result) {
                self.details.director = result.data.crew[0].name;
                self.details.star1 = result.data.cast[0].name;
                self.details.star2 = result.data.cast[1].name;
                self.details.star3 = result.data.cast[2].name;
                self.addMovie(newMovie);
            }).catch(function (err) {
                console.log(err);
                alert('Error');
            });
        }).catch(function (err) {
            console.log(err);
            alert('Error');
        });
    };

    //this function is only ever called by self.getDetails
    self.addMovie = function (newMovie) {

        newMovie.synopsis = self.details.synopsis;
        newMovie.revenue = self.details.revenue;
        newMovie.runtime = self.details.runtime;
        newMovie.budget = self.details.budget;
        newMovie.director = self.details.director;
        newMovie.star1 = self.details.star1;
        newMovie.star2 = self.details.star2;
        newMovie.star3 = self.details.star3;
        
        $http({
            method: 'POST',
            url: '/movies',
            data: newMovie
        }).then(function (res) {
            self.getMovies();
            $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Done!')
                  .textContent('Movie added!')
                  .ok('Got it!')
              );
        }).catch(function (err) {
            console.log(err);
            alert('Error');

        });
    };
    
    self.getMovies = function () {
        $http({
            method: 'GET',
            url: '/movies'
        }).then(function (result) {
            self.movies.list = result.data;
        }).catch(function (err) {
            console.log(err);
            alert('Error');
        });

    };

    self.addGenre = function (newGenre) {
        $http({
            method: 'POST',
            url: '/genres',
            data: {
                newGenre: newGenre
            }
        }).then(function (result) {
            self.getGenres();
            $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Done!')
                  .textContent('Genre added!')
                  .ok('Got it!')
              );
        }).catch(function (err) {
            console.log(err);
            alert('Error');
        });
    };

    self.getGenres = function () {
        $http({
            method: 'GET',
            url: '/genres/count'
        }).then(function (result) {
            self.genres.list = result.data;
        }).catch(function (err) {
            console.log(err);
            alert('Error');
        });
    };

    self.getGenresList = function () {
        $http({
            method: 'GET',
            url: '/genres/list'
        }).then(function (result) {
            console.log(result.data);

            self.genresList.list = result.data;
        }).catch(function (err) {
            console.log(err);
            alert('Error');
        });
    };

    self.removeMovie = function (movie) {
        $http({
            method: 'DELETE',
            url: `/movies/${movie.id}`
        }).then(function (results) {
            self.getMovies();
            $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Done!')
                  .textContent('Movie deleted.')
                  .ok('Got it!')
              );
        }).catch(function (err) {
            console.log(err);
            alert('Error');
        })

    }

    self.editDialog = function (ev, movie) {
        self.movieToEdit = movie;
        $mdDialog.show({
            controller: 'MoviesController as vm',
            templateUrl: '/views/dialog.view.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
        self.newMovie = movie;
    };

    self.editMovie = function (movie) {
        $http.get(
            `https://api.themoviedb.org/3/search/movie?api_key=7ba5feeb1c69e54538affe7c9eea0403&language=en-US&query=${movie.title}&page=1&include_adult=false`
        ).then(function (result) {
            movie.db_id = result.data.results[0].id;
            movie.image_path = result.data.results[0].poster_path;
            $http({
                method: 'PUT',
                url: `/movies/`,
                data: movie
            }).then(function (results) {
                self.getMovies();
                $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Done!')
                      .textContent('Movie Edited!')
                      .ok('Got it!')
                  );
            }).catch(function (err) {
                console.log(err);
                alert('Error');

            })

        }).catch(function (err) {
            console.log(err);
            alert('Error');

        });
        
    }

    self.deleteGenre = function (genre){
        $http({
            method: 'DELETE',
            url: `genres/${genre.genre}`
        }).then( function (result){
            self.getGenres();
            $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Done!')
                  .textContent('Genre and related movies deleted.')
                  .ok('Got it!')
              );
        }).catch( function(err){
            console.log(err);
            alert('Error');

        })
    };
}]);