var app = angular.module('App', []);

app.service('DBRunner', function($http) {

  this.fetch = function(title) {
    return $http({
      method: 'GET',
      url: '/api/books',
    })
  }

  this.send = function(book) {
    return $http({
      method: 'POST',
      url: '/api/books',
      data: JSON.stringify(book)
    })
  }
});

app.controller('BooksController', function($scope, $http, DBRunner) {

  $scope.library = [];

  $scope.createBook = function(title, author, pages, quotes) {
    if (title && author) {
      var newBook = {
        title: title, 
        author: author, 
        pages: pages, 
        quotes: quotes || [], 
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

      // Check if newBook.title matches any current book records
      DBRunner.fetch().then(function (response) {
        var booksArr = response.data;
        var bookNotInDb = true;

        // if it does, just append that pre-existing book to the DOM but don't put it on the database
        booksArr.forEach(function(book) {
          if (book.title === newBook.title) {
            bookNotInDb = false
          } 
        });

        // if it doesn't, create a new DB entry and update the DOM
        if (bookNotInDb) {
          $scope.library.push(newBook);
          DBRunner.send(newBook).then(function(response) { console.log(response + 'sent!') }, function(err) { console.log(err) });
        } else {
          $scope.library.push(newBook);
        }

      }, function (err) { console.log(err) });

    } // if title && author
  }

    $scope.createBook('Harry Potter', 'J.K. Rowling', 100);
    $scope.createBook('When Breath Becomes Air', 'Paul Kalinthi', 350);


});