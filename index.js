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
        toggleEditor: function(){
          this.editorEnabled = !this.editorEnabled;
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