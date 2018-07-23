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

    //this function is only ever called within self.getDb_id
    self.addMovie = function (newMovie) {

        newMovie.db_id = self.details.db_id;
        newMovie.image_path = self.details.image_path;
        // console.log(newMovie);
        $http({
            method: 'POST',
            url: '/movies',
            data: newMovie
        }).then(function (res) {
            // console.log('Successful POST', res);
            //do a GET here
            self.getMovies();

        }).catch(function (err) {
            console.log(err);

        });
    };

    self.getDetails = function (db_id) {
        console.log(db_id);

        //this is two API get calls, nested, one inside the other, 
        $http.get(
            `https://api.themoviedb.org/3/movie/${db_id}?api_key=7ba5feeb1c69e54538affe7c9eea0403&language=en-US`
        ).then(function (result) {
            console.log('successful movieDB response:', result.data);
            self.details.synopsis = result.data.overview;
            self.details.revenue = result.data.revenue;
            self.details.runtime = result.data.runtime;
            self.details.budget = result.data.budget;
            $http.get(
                `https://api.themoviedb.org/3/movie/${db_id}/credits?api_key=7ba5feeb1c69e54538affe7c9eea0403`
            ).then(function (result) {
                console.log('successful movieDB response:', result.data);
                self.details.director = result.data.crew[0].name;
                self.details.star1 = result.data.cast[0].name;
                self.details.star2 = result.data.cast[1].name;
                self.details.star3 = result.data.cast[2].name;
                console.log(self.details);
            }).catch(function (err) {
                console.log(err);
            });
        }).catch(function (err) {
            console.log(err);

        });
        
        
    };

    //this function is called on the Add Movie Button Click
    //then it calls self.addMovie
    //I did it like this because the API call takes too long and the order of operations was getting screwed up because the code was moving on before the response came back
    self.getDb_id = function (newMovie) {
        $http.get(
            `https://api.themoviedb.org/3/search/movie?api_key=7ba5feeb1c69e54538affe7c9eea0403&language=en-US&query=${newMovie.title}&page=1&include_adult=false`
        ).then(function (result) {
            self.details.db_id = result.data.results[0].id;
            self.details.image_path = result.data.results[0].poster_path;
            self.addMovie(newMovie);
        }).catch(function (err) {
            console.log(err);
        })
    };

    self.getMovies = function () {
        $http({
            method: 'GET',
            url: '/movies'
        }).then(function (result) {
            self.movies.list = result.data;

            // self.movies.list = result.data;
        }).catch(function (err) {
            console.log(err);

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
            console.log(result);
            self.getGenres();
        }).catch(function (err) {
            console.log(err);

        });
    };

    self.getGenres = function () {
        console.log('Getting Genres');
        $http({
            method: 'GET',
            url: '/genres/count'
        }).then(function (result) {
            console.log(result.data);

            self.genres.list = result.data;
        }).catch(function (err) {
            console.log(err);

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

        });
    };

    self.removeMovie = function (movie) {
        $http({
            method: 'DELETE',
            url: `/movies/${movie.id}`
        }).then(function (results) {
            self.getMovies();
        }).catch(function (err) {
            console.log(err);

        })

    }

    self.editDialog = function (ev, movie) {
        console.log('Clicked Edit');
        
        self.movieToEdit = movie;
        $mdDialog.show({
            controller: 'MoviesController as vm',
            templateUrl: '/views/dialog.view.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
        // .then(function(answer) {
        //   self.status = 'You said the information was "' + answer + '".';
        // }, function() {
        //   self.status = 'You cancelled the dialog.';
        // });
        self.newMovie = movie;
    };

    self.editMovie = function (movie) {
        console.log('Editing:', movie);
        $http.get(
            `https://api.themoviedb.org/3/search/movie?api_key=7ba5feeb1c69e54538affe7c9eea0403&language=en-US&query=${movie.title}&page=1&include_adult=false`
        ).then(function (result) {
            //do something with the result
            // console.log('successful movieDB response:', result.data.results[0].id);
            movie.db_id = result.data.results[0].id;
            movie.image_path = result.data.results[0].poster_path;
            $http({
                method: 'PUT',
                url: `/movies/`,
                data: movie
            }).then(function (results) {
                self.getMovies();
            }).catch(function (err) {
                console.log(err);
    
            })

        }).catch(function (err) {
            console.log(err);
        });
        
    }

    self.deleteGenre = function (genre){
        console.log('Delete Genre');
        $http({
            method: 'DELETE',
            url: `genres/${genre.genre}`
        }).then( function (result){
            self.getGenres();
        }).catch( function(err){
            console.log(err);
            
        })
    }

    self.message = 'Service has started';
}]);