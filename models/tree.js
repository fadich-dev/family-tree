var db = require('../db');

var nodes = [];

exports.getTree = function (callback) {
    try {
        db.get().collection('person').find().toArray(function (err, doc) {
            if (err) {
                console.error(err);
                return callback(false);
            }

            return callback(doc);
            // nodes = doc;
            // return callback(buildTree(null));
        });
    } catch (e) {
        console.error(e.message);
        return callback(false);
    }
};

function buildTree(parent) {
    var tree = [];
    var i = 0;
    nodes.forEach(function (element) {
        if (element.parent == parent) {
            tree[i] = element;
            tree[i].children = buildTree(tree[i]._id);
            i++;
        }
    });
    return tree;
}
