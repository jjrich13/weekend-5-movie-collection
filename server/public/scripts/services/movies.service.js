app.service('MoviesService', ['$http', function($http){
    let self = this;
    // self.db_id = 0;
    //to change size change the number
    self.imageUrlBase = 'http://image.tmdb.org/t/p/w185';

    self.addMovie = function(newMovie){
        
        newMovie.db_id = self.db_id
        console.log(newMovie);
        $http({
            method: 'POST',
            url: '/movies',
            data: newMovie
        }).then( function(res){
            console.log('Successful POST', res);
            //do a GET here
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

    self.getDb_id = function(newMovie){
        console.log('Clicked');
        console.log(newMovie.title);
        
        
        $http.get(
            `https://api.themoviedb.org/3/search/movie?api_key=7ba5feeb1c69e54538affe7c9eea0403&language=en-US&query=${newMovie.title}&page=1&include_adult=false`
        ).then(function (result) {
            //do something with the result
            console.log('successful movieDB response:', result.data.results[0].id);
            self.db_id = result.data.results[0].id;
            self.addMovie(newMovie)
            console.log(newMovie);
            
            // return result.data.results[0].id;
            // self.getDetails();
            //maybe view more button?

        }).catch(function (err) {
            console.log(err);
            return null;
        })
    }


    self.message = 'Service has started';
}])