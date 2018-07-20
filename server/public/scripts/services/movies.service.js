app.service('MoviesService', ['$http', function($http){
    let self = this;

    self.movies = {
        list: []
    };

    self.genres = {
        list: []
    };

    self.details = {};

    // self.db_id = 0;

    //to change size, change the number:
    self.imageUrlBase = 'http://image.tmdb.org/t/p/w185';

    self.addMovie = function(newMovie){
        
        newMovie.db_id = self.details.db_id;
        newMovie.image_path = self.details.image_path;
        // console.log(newMovie);
        $http({
            method: 'POST',
            url: '/movies',
            data: newMovie
        }).then( function(res){
            // console.log('Successful POST', res);
            //do a GET here
            self.getMovies();

        }).catch( function(err){
            console.log(err);
            
        });
    };

    self.getDetails = function (movieId) {

        $http.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=7ba5feeb1c69e54538affe7c9eea0403&language=en-US`
        ).then(function (result) {
            //do something with result
            console.log('successful movieDB response:', result);
            //
        }).catch(function (err) {
            console.log(err);

        })
    };

    //grabbing DB id and image path
    self.getDb_id = function(newMovie){
        // console.log(newMovie.title);
        
        
        $http.get(
            `https://api.themoviedb.org/3/search/movie?api_key=7ba5feeb1c69e54538affe7c9eea0403&language=en-US&query=${newMovie.title}&page=1&include_adult=false`
        ).then(function (result) {
            //do something with the result
            // console.log('successful movieDB response:', result.data.results[0].id);
            self.details.db_id = result.data.results[0].id;
            self.details.image_path = result.data.results[0].poster_path;
            self.addMovie(newMovie)
            // console.log(newMovie);
            
            // return result.data.results[0].id;
            //maybe view more button?

        }).catch(function (err) {
            console.log(err);
            return null;
        })
    };

    self.getMovies = function (){
        $http({
            method: 'GET',
            url: '/movies'
        }).then( function (result){
            self.movies.list = result.data;
            
            // self.movies.list = result.data;
        }).catch(function (err){
            console.log(err);
            
        });
        
    };

    self.addGenre = function (newGenre){
        $http({
            method: 'POST',
            url: '/genres',
            data: {newGenre: newGenre}
        }).then( function (result){
            console.log(result);
            self.getGenres();
        }).catch( function( err){
            console.log(err);
            
        });
    };

    self.getGenres = function (){
        console.log('Getting Genres');
        $http({
            method: 'GET',
            url: '/genres'
        }).then( function (result){
            console.log(result.data);
            
            self.genres.list = result.data;
        }).catch( function( err){
            console.log(err);
            
        });
    }

    self.message = 'Service has started';
}]);