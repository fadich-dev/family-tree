var db       = require('../db');
var ObjectID = require('mongodb').ObjectID;
var tree     = require('./tree');

function Person() {

    this._id    = undefined;
    this.name   = undefined;
    this.photo  = undefined;
    this.parent = undefined;

    this.setAttributes = function (data) {
        if (!isEmpty(data)) {
            try {
                this.name = data.name ? data.name.trim() : null;
            } catch (e) {
                // errors.name = "Error handling";
                console.error(e);
            }
            try {
                this.photo  = data.photo  ? data.photo.trim()  : null;
            } catch (e) {
                // errors.photo = "Error handling";
                console.error(e);
            }
            try {
                this.parent = data.parent ? data.parent.trim() : null;
            } catch (e) {
                // errors.parent = "Error handling";
                console.error(e);
            }
        }
        return this;
    };

    this.validate = function () {
        if (!this.name) {
            errors.name = "Attribute is required";
        } else if (typeof this.name != "string") {
            errors.name = "Attribute should be a string";
        } else if (this.name.length < 3) {
            errors.name = "Too short name (should be 3 or more symbols)";
        }

        if (this.photo && typeof this.photo != "string") {
            errors.photo = "Attribute should be a string";
        }

        var isParent = function () {
            return db.get().collection('person').findOne({parent: null});
        };
        var isPerson = function (parentId) {
            return db.get().collection('person').findOne({_id: ObjectID(parentId)});
        };
        var inBranch = function (person) {
            return false;
        };

        console.log(inBranch());
        if (this.parent && typeof this.parent != "string") {
            errors.parent = "Attribute should be a string";
        } else if (!this.parent && isParent()) {
            errors.parent = "A parent node exists already";
        } else if (this.parent && !isPerson(this.parent)) {
            errors.parent = "There is no person having specified ID";
        } else if (this.parent && inBranch(this)) {
            errors.parent = "Child node cannot be specified as parent";
        }

        return !this.hasErrors();
    };

    /**
     * Data errors (the validation errors).
     *
     * @see errors
     *
     * @returns {{}}
     */
    this.getErrors = function () {
        return errors;
    };

    this.hasErrors = function () {
        return !isEmpty(this.getErrors());
    };

    this.save = function (skipValidation) {
        if (!skipValidation && !this.validate()) {
            return false;
        }
        try {
            return !this._id ? create(this) : update(this);
        } catch (e) {
            return false;
        }

    };

    this.delete = function () {

        // TODO: delete the record (branch: and every child)

        return true;
    };

    /**
     * Data errors. For example, the validation errors (in case of data is invalid).
     * The object has structure such us:
     *
     * ```
     *   {
     *       key: ["Some error message", "Maybe, second message..."],
     *   }
     * ```
     *
     * As a key there can be served a property name.
     *
     * @type {{}}
     */
    var errors = {};

    var create = function (person) {
        person._id = ObjectID();
        db.get().collection('person').insert(person, function(err) {
            if (err){
                console.error(err);
                throw new Error(err);
            }
        });
        return true;
    };

    var update = function (person) {
        db.get().collection('person').update({_id: ObjectID(person._id)}, person, function(err) {
            if (err){
                console.error(err);
                throw new Error(err);
            }
        });

        return true;
    };

    var isEmpty = function (obj) {
        return Object.keys(obj).length === 0
    }
}

exports.get = function (id, callback) {

    var person = new Person();

    if (!id) {
        return callback(person);
    }

    var objId = null;
    try {
        objId = ObjectID(id);
    } catch (e) {
        console.warn(e.message);
        return callback(false);
    }

    db.get().collection('person').findOne({_id: objId}, function(err, doc) {
        if (err){
            console.error(err);
            return callback(false);
        }

        if (!doc) {
            return callback(false);
        }

        // setting properties
        person.setAttributes({
            name:   doc.name,
            photo:  doc.photo,
            parent: doc.parent
        })._id = doc._id;

        return callback(person);
    });
};
