app.service('MoviesService', ['$http', function($http){
    let self = this;
    self.movieId = 0;
    //to change size change the number
    self.imageUrlBase = 'http://image.tmdb.org/t/p/w185';
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

    self.getMovieId = function(movieTitle){
        console.log('Clicked');
        console.log(movieTitle);
        
        
        $http.get(
            `https://api.themoviedb.org/3/search/movie?api_key=7ba5feeb1c69e54538affe7c9eea0403&language=en-US&query=${movieTitle}&page=1&include_adult=false`
        ).then(function (result) {
            //do something with the result
            console.log('successful movieDB response:', result.data.results[0].id);
            self.movieId = result.data.results[0].id
            // self.getDetails();
            //maybe view more button?

        }).catch(function (err) {
            console.log(err);

        })
    }
    self.message = 'Service has started';
}])