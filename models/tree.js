var mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/family_tree';

var db       = require('../db');
var ObjectID = require('mongodb').ObjectID;

exports.getTree = function () {
    try {
        db.get().collection('family_tree').find({}).toArray(function (err, doc) {
            if (err) {
                console.error(err);
                return false;
            }
            return doc;
        });
    } catch (e) {
        console.log(e.message);
        return false;
    }
};
