console.log('Client JS is running');
const app = angular.module('MoviesApp', ['ngRoute', 'ngMaterial']);

app.config( function ($routeProvider){
    $routeProvider.when('/',{
        redirectTo: '/movies',
    }).when('/movies', {
        templateUrl: '/views/movies.view.html',
        controller: 'MoviesController as vm'
    }).when('/genres', {
        templateUrl: '/views/genres.view.html',
        controller: 'GenresController as vm'
    }).otherwise({
        template: '<h1>404</h1>'
    });
});
