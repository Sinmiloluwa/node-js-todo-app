var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));


// fire controllers
todoController(app);

// listen to port
const port = process.env.PORT || 5000
app.listen(port);
console.log('You are listening to the port 3000');
