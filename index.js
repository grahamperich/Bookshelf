var app = angular.module('App', []);

app.service('Book', function() {

});

app.controller('BooksController', function($scope, Book) {

  $scope.library = [];

  $scope.createBook = function(title, author, pages, read) {
    if (title && author) {
      var newBook = {
        title: title, // STRING
        author: author, // STRING
        pages: null, // NUMBER
        read: false, // BOOLEAN
        quotes: [], // ARRAY
        editorEnabled: false,
        showQuotes: false,
        toggleQuotes: function() {
          this.showQuotes = !this.showQuotes;
        },
        toggleEditor: function() {
          this.editorEnabled = !this.editorEnabled;
        },
        addQuote: function(newQuote) {
          this.quotes.push(newQuote);
          this.newQuote = null;
        }
      }

      $scope.title = null;
      $scope.author = null;
      $scope.library.push(newBook);    
    }
  }

  $scope.createBook('test', 'graham');
  $scope.createBook('test2', 'perich');


});