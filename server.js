console.log('Server');

var express = require('express');
var app = express();


app.get('/', function(req, res){
    res.send('hello world');
});


app.all('*', function(req, res){
    res.send("Incorrect request");
});

app.listen("4242");

