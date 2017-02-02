console.log(new Date());
console.info('Running server. . .');

/**********************************************************************************************************************/

var express = require('express');
var app = express();

var person = require('./models/person');


app.get('/', function(req, res) {
    res.send("Tree");
});

app.get('/get/:id', function(req, res) {
    res.send(JSON.stringify(person.get(req.params.id)));
});


app.all('*', function(req, res) {
    res.statusCode = 404;
    res.send("Incorrect request");
});

app.listen("4242");

