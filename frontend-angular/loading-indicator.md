

```js

$routeProvider.when('/library', {
  templateUrl: 'partials/library.html', 
  controller: 'LibraryCtrl',
  resolve: {
    books: function(srvLibrary) {
      return srvLibrary.getBooks();
    },
    movies: function(srvLibrary) {
      return srvLibrary.getMovies();
    }
  }
});

ctrl.controller('LibraryCtrl', ['$scope', 'books', 'movies', function($scope, books, movies) {
    $scope.books = books.data;
    $scope.movies = movies.data;
}]);

app.run(['$rootScope', function($root) {
  $root.$on('$routeChangeStart', function(e, curr, prev) { 
    if (curr.$$route && curr.$$route.resolve) {
      // Show a loading message until promises are not resolved
      $root.loadingView = true;
    }
  });
  $root.$on('$routeChangeSuccess', function(e, curr, prev) { 
    // Hide loading message
    $root.loadingView = false;
  });
}]);

```