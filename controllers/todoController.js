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

// Save item to database
var itemOne = Todo({item : 'get flowers'}).save(function(err){
  if (err) throw err;
  console.log('item saved');
});

var data = [{item: 'get milk'}, {item: 'get food'}, {item: '10 minutes of exercise'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

  app.get('/todo', function(req, res){
    res.render('todo', {todo: data});
  });

  app.post('/todo', urlencodedParser, function(req, res){
    data.push(req.body);
    res.json(data);
  });

  app.delete('/todo/:item', function(req, res){
    data = data.filter(function(todo){
      return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);
  });
}
