var db = require('../db');

var nodes = [];

exports.getTree = function (callback) {
    try {
        db.get().collection('person').find().toArray(function (err, doc) {
            if (err) {
                console.error(err);
                return callback(false);
            }

            nodes = doc;
            return callback(buildTree(null));
        });
    } catch (e) {
        console.error(e.message);
        return callback(false);
    }
};

function buildTree(parent) {
    var tree = [];
    nodes.forEach(function (element, index) {
        if (element.parent == parent) {
            tree[index] = element;
            tree[index].children = buildTree(tree[index]._id);
        }
    });
    return tree;
}
