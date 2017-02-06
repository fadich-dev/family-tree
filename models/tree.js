var db       = require('../db');
var ObjectID = require('mongodb').ObjectID;

exports.getTree = function () {
    try {
        db.get().collection('family_tree').find({}).toArray(function (err, doc) {
            if (err) {
                console.error(err);
                return false;
            } else {
                return doc;
            }
        });
    } catch (e) {
        console.log(e.message);
        return false;
    }
};
