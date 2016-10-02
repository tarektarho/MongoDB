var ObjectId = require('mongodb').ObjectID;
var todosAPI = {

    getTodos: function(collection, document, callback) {
        collection.find().toArray(function(err, result) {
            if (err) {
                console.log(err);
                callback('Error getting todos', null);
            } else if (result.length) {
                console.log('Found:', result);
                callback(null, result);
            } else {
                console.log('No document(s) found with defined "find" criteria!');
            }
        })
    },
insertTodo: function(collection, insertItem, callback) {

        collection.insert(insertItem,function(err,result) {
            if (!err) {
                callback(null,result);

            } else {
                console.warn('Error in insertTodo');
                callback(null);
            }
        })

},

updateTodo: function(collection, updateItem, callback) {
    if (updateItem) {

  collection.update( {"_id" : ObjectId("57f10ace50644028dcf51791") },function(err,result) {
        if (!err) {
            callback(null,result);
            

        } else {
            console.warn('Error in updateTodo');
            console.log(err);
            callback(null);
        }
    })
}
        else {
    console.log('No updateItem')

    }

},

 deleteTodo: function(collection,deleteItem, callback) {
    if (deleteItem) {
        

      collection.deleteOne( { "_id" : ObjectId(deleteItem) }, function(err,result) {

            if (!err) {

                callback(null,result);
            } else {
                console.warn('Error in deleteTodo');
                console.log(err);
                callback(null);
            }
        });
    }

}
};
module.exports.todosAPI = todosAPI;
