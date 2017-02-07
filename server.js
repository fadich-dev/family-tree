console.log("\n\n***\n" + new Date());
console.info('Running server. . .');

/**********************************************************************************************************************/

var express = require('express');
var app = express();

var person     = require('./models/person');
var tree       = require('./models/tree');
var db         = require('./db');
var bodyParser = require('body-parser');
// var url    = require('url');

db.connect('mongodb://localhost:27017/family_tree', function (err) {
    if (err) {
        console.error(err);
    } else {
        app.listen(3000, function() {
            console.info('Listening on port 3000. . .');
        });
    }
});

/**
 * @param message     The message information about an action result.
 *                    Can be accompanied by a key like: success; info; notice; error.
 * @param data        Data to be transferred to client.
 * @returns {{message: ({}), data: ({})}}
 */
var send = function (message, data) {
    return {
        message: message || {},
        data:    data    || {}
    }
};

app.use(bodyParser.urlencoded());
app.use( bodyParser.json() );       // to support JSON-encoded bodies

// app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
    // res.render('index');
    res.send();
});

app.post('/get-tree', function(req, res) {

    res.type = "application/json";

    tree.getTree(function (data) {
        // processing the received data
        res.send(send(
            data === false ? {error: "Failed getting tree"} : null,
            {tree: data}
            )
        );
    });
});

app.post('/person/create', function(req, res) {

    res.type = "application/json";

    // console.log(req.body);
    // res.send(send(null, {data: req.body}));
    // return ;

    person.get(false, function (person) {
        if (person) {
            // TODO: do not forget about photo!
            if (person.setAttributes(req.params).save()) {
                return res.send(send({success: "Node successfully created"}));
            }
            res.statusCode = 400;
            return res.send(send(
                {warning: "Node cannot be created. Maybe, data is invalid. Check it for the correctness and try again"},
                {errors: person.getErrors()}
            ));
        }
        return res.send(send({error: "Person was not found"}));
    });
});

app.post('/person/:id', function(req, res) {

    res.type = "application/json";

    person.get(req.params.id, function (person) {
        res.send(send(
            person === false ? {error: "Person was not found"} : null,
            {person: person}
            )
        );
    });
});

app.post('/person/:id/update', function(req, res) {

    res.type = "application/json";

    var person = person.get(req.id).setAttributes(req);
    if (person.save()) {
        res.send(send({success: "Node successfully updated"}));
        res.end();
    }

    res.statusCode = 400;
    res.send(send(
        {warning: "Node cannot be updated. Maybe, data is invalid. Check it for the correctness and try again"},
        {error: person.getErrors()}
    ));
});

app.delete('/person/:id/delete', function(req, res) {

    res.type = "application/json";

    var person = person.get(req.id);
    if (person.delete()) {
        res.send(send({success: "Node (branch) successfully deleted"}));
        res.end();
    }

    res.statusCode = 400;
    res.send(send(
        {warning: "Node cannot be updated. Maybe, data is invalid. Check it for the correctness and try again"},
        {error: person.getErrors()}
    ));
});


app.all('*', function(req, res) {
    res.statusCode = 404;
    res.send("Incorrect request. Page not found");
});

app.listen("4242");
