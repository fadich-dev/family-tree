var db       = require('../db');
var ObjectID = require('mongodb').ObjectID;

function Person() {

    this._id    = null;
    this.name   = null;
    this.photo  = null;
    this.parent = null;

    this.setAttributes = function (data) {
        if (!isEmpty(data)) {
            this.name   = data.name   || null;
            this.photo  = data.photo  || null;
            this.parent = data.parent || null;
        }
        return this;
    };

    this.validate = function () {
        if (this.hasErrors()) {
            return false;
        }

        // TODO: check data for correctness

        return true;
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
        return isEmpty(this.getErrors());
    };

    this.save = function (skipValidation) {
        if (!skipValidation && !this.validate()) {
            return false;
        }
        return !this._id ? create(this) : update(this);

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

        // TODO: create new record

        return true;
    };

    var update = function (person) {

        // TODO: update the record (by id)

        return true;
    };

    var isEmpty = function (obj) {
        return Object.keys(obj).length === 0
    }
}

exports.get = function (id) {
    if (!id) {
        return new Person();
    }

    var person = new Person();

    db.get().collection('family_tree').findOne({_id: ObjectID(id)}, function(err, person) {
        if (err){
            console.error(err);
            return false;
        }
        if (!person) {
            return false;
        }
        // getting data
        var data = {
            name:   person.name,
            photo:  person.photo,
            parent: person.parent
        };

        person.setAttributes(data)._id = data.id;
        return person;

    });
    return person;
};
