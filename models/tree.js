var mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/family_tree';

exports.getTree = function () {

    // TODO: get tree

    mongo.connect(url, function(err, db) {
        if (err) {
            return false;
        }
        var familyTree = db.collection('family_tree');

        // familyTree.listDatabases(function(err, dbs) {
        //     if (err) {
        //         return [];
        //     }
            // test.equal(null, err);
            // test.ok(dbs.databases.length > 0);
            db.close();
        // });
        console.log(familyTree);
    });

    return [];
};
