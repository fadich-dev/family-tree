console.log("\n\n***\n" + new Date());
console.info('Running server. . .');

/**********************************************************************************************************************/

var express    = require('express');
var bodyParser = require('body-parser');
var person     = require('./models/person');
var tree       = require('./models/tree');
var db         = require('./db');
// var url    = require('url');


var app = express();

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

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
    res.render('index');
    res.send();
});

app.post('/get-tree', function(req, res) {

    res.type = "application/json";

    tree.getTree(function (data) {
        // processing the received data
        res.send(send(
            data === false ? {type: "error", text: "Failed getting tree"} : null,
            {tree: data}
            )
        );
    });
});

app.post('/person/create', function(req, res) {

    res.type = "application/json";

    person.get(false, function (person) {
        if (person) {
            // TODO: do not forget about photo!
            if (person.setAttributes(req.body).save()) {
                return res.send(send({type: "success", text: "Node successfully created"}));
            }
            res.statusCode = 400;
            return res.send(send(
                {
                    type: "warning",
                    text: "Node cannot be created. Maybe, data is invalid. Check it for the correctness and try again"
                },
                {errors: person.getErrors()}
            ));
        }
        return res.send(send({type: "error", text: "Person was not found"}));
    });
});

app.post('/person/:id', function(req, res) {

    res.type = "application/json";

    person.get(req.params.id, function (person) {
        res.send(send(
            person === false ? {type: "error", text: "Person was not found"} : null,
            {person: person}
            )
        );
    });
});

app.post('/person/:id/update', function(req, res) {

    res.type = "application/json";

    person.get(req.params.id, function (person) {
        if (person) {
            // TODO: do not forget about photo!
            if (person.setAttributes(req.body).save()) {
                return res.send(send({type: "success", text: "Node successfully updates"}));
            }
            res.statusCode = 400;
            res.send(send(
                {
                    type: "warning",
                    text: "Node cannot be updated. Maybe, data is invalid. Check it for the correctness and try again"
                },
                {error: person.getErrors()}
            ));
        }
        return res.send(send({error: "Person was not found"}));
    });
});

app.post('/person/:id/delete', function(req, res) {

    res.type = "application/json";

    var person = person.get(req.params.id);
    if (person.delete()) {
        res.send(send({type: "success", text: "Node (branch) successfully deleted"}));
        res.end();
    }

    res.statusCode = 400;
    res.send(send(
        {
            type: "warning",
            text: "Node cannot be updated. Maybe, data is invalid. Check it for the correctness and try again"
        },
        {error: person.getErrors()}
    ));
});

app.all('/test', function (req, res) {
    res.send("Method: " + req.method + " query: " + JSON.stringify(req.query) + "; body: " + JSON.stringify(req.body));
});


app.all('*', function(req, res) {
    console.warn("Incorrect request \"" + req.url + "\": page not found");
    res.statusCode = 404;
    res.send("Incorrect request \"" + req.url + "\": page not found");
});

app.listen("4242");
