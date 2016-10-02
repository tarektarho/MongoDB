var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongo = require('mongodb').MongoClient;
var todosAPI = require('./todosAPI').todosAPI;


// Try this out - guess what it prints before you uncomment it!
//console.log(todosAPI);

// Create a new application.
var app = express();
var collection = null; // NOT connection IT IS coLLection
mongo.connect('mongodb://localhost:27017/todos', function(err, db) {
    if (!err) {
      // Set the collection we will use here once
        collection = db.collection('todos');
        console.log('Database is connected ...');
    } else {
        console.warn('Error connecting database ...')
    }
});

console.log('Collection: ', collection);
// Use JSON body parser middleware.
app.use(bodyParser.json());

// Actions
app.get('/todo', function(request, response) {
    var id = request.params.id;
    var rows = todosAPI.getTodos(collection, id, function(err, documents) {
        if (!err) {
            console.log('Documents received by get: ', documents);
            response.json(documents);
            response.end();
        } else {
            console.warn('Error in GET');
        }
    });
});

// Insert a todo
app.post('/todo', function(request, response) {

    var insertItem = request.body;
    console.log("The body is: ", insertItem);

      var inserted = todosAPI.insertTodo(collection,insertItem, function(err, documents) {
        if (!err) {
            console.log('Documents Insert by post' , documents);
            response.json(documents);
          response.end();
      } else{
            console.warn('Error in POST')
      }
        
      });

});

// Delete a todo
app.delete('/todo/:id', function(request, response) {
    var deleteItem = request.params.id;
    console.log("Trying to delete:", deleteItem);
    

    var deleteFunction = todosAPI.deleteTodo(collection, deleteItem, function(err, documents) {
        if (!err) {
            response.json(documents);
          response.end();

        } else{
            console.warn('Error in Delete')
        }
      });
});

// Update a todo
app.put('/todo/:id', function(request, response) {
    var updateItem = request.body;
    var updateId = request.params.id; 
    console.log("Tring to updet:",updateItem);

   
    var updateFunction = todosAPI.updateTodo(collection, updateItem, updateId, function(err, documents) {
        if (!err){
            console.log('documents updet',documents);
            response.json(documents);
        response.end();

        } else{
            console.warn('Error in updet')
            response.end();
        }

    });
});


function sendError(response, code, message) {
    response.statusCode = code;
    response.json({
        error: message
    });
    response.end();
}


// Start the server.
app.listen(8080);
