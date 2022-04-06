var bodyParser = require('body-parser');
var mongoose =  require('mongoose');

// connect to the database
mongoose.connect("mongodb+srv://Blvcksimons:Precious97!@todo.buf5v.mongodb.net/todo?retryWrites=true&w=majority");

// Create a schema for database
var todoSchema = new mongoose.Schema({
  item: String
});

// Create a model for Todo
var Todo = mongoose.model('Todo', todoSchema);

// var data = [{item: 'get milk'}, {item: 'get food'}, {item: '10 minutes of exercise'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

  app.get('/todo', function(req, res){
    // get data from db and pass to the view
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render('todo', {todo: data});
    });
  });

  app.post('/todo', urlencodedParser, function(req, res){
    // get data from the view and send to the db
    var newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res){
    // delete the requested item from the //
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
}
