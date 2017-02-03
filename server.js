console.log(new Date());
console.info('Running server. . .');

/**********************************************************************************************************************/

var express = require('express');
var app = express();

var person = require('./models/person');

var send      = function (message, data) {
    return {
        message: message,
        data:    data
    }
};

app.get('/', function(req, res) {
    var ww = JSON.stringify(person.get().setAttributes());
    res.send("Tree " + ww);
});

app.post('/person/:id', function(req, res) {
    res.type = "application/json";
    res.send(send(
        null,
        {person: person.get(req.params.id)}
    ));
});

app.post('/person/create', function(req, res) {
    var person = person.get().setAttributes(req);
    if (person.save()) {

    }
    var send = JSON.stringify();
    res.send(send);
});

app.post('/person/:id/update', function(req, res) {
    var send = JSON.stringify(person.get(req.params.id));
    res.send(send);
});

app.delete('/person/:id/delete', function(req, res) {
    var send = JSON.stringify(person.get(req.params.id));
    res.send(send);
});


app.all('*', function(req, res) {
    res.statusCode = 404;
    res.send("Incorrect request");
});

app.listen("4242");

