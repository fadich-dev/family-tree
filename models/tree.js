var db = require('../db');

exports.getTree = function (callback) {
    try {
        db.get().collection('person').find().toArray(function (err, doc) {
            if (err) {
                console.error(err);
                return callback(false);
            }
            return callback(doc);
        });
    } catch (e) {
        console.error(e.message);
        return callback(false);
    }
};
