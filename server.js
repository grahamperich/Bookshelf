var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jsonParser = bodyParser.json();

// START SERVER; CONNECT DATABASE
var app = express();

app.listen(1337, function(){
  console.log('Listening on port 1337');
});

mongoose.connect('mongodb://localhost/bookshelf');

var db = mongoose.connection;
var Book;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  // Schemas and Models are created in the callback
  console.log('hello world');
  
});

var bookSchema = mongoose.Schema({
    title: String,
    author: String,
    pages: Number,
    quotes: Array
  });

var Book = mongoose.model('Book', bookSchema);

// var testBook = new Book({
//   title: 'Hello',
//   author: 'World',
//   pages: 100,
//   quotes: []
// });

// testBook.save(function(err) {
//   if (err) {
//     console.log('error: ', err);
//   }
// });

// SERVE STATIC ASSETS
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/style.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/style.css'));
});

app.get('/node_modules/angular/angular.js', function(req, res) {
  res.sendFile(path.join(__dirname + '/node_modules/angular/angular.js'));
});

app.get('/index.js', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.js'));
});

app.get('/api_key.js', function(req, res) {
  res.sendFile(path.join(__dirname + '/api_key.js'));
});

// POPULATE CURRENT LIBRARY FROM DB

app.get('/api/books', function(req, res) {
  Book.find().then(function(err, books) {
    if (err){
      res.send(err)
    } else {
      res.send(books);
    }
  })
});

app.post('/api/books', jsonParser, function(req, res) {
  console.log(req.body);
  var b = req.body;
  // Book.find().then(function(err, books) {
  //   if (err){
  //     res.send(err)
  //   } else {
  //     res.send(books);
  //   }
  // })
  var newBook = new Book({
    title: b.title,
    author: b.author,
    pages: b.pages,
    quotes: b.quotes
  })

  newBook.save(function(err) {
    if (err) {
      console.log('error: ', err);
    }
  })
  
  res.send(newBook);
});

app.post('/', jsonParser, function(req, res) {
  console.log(req.body);
})
