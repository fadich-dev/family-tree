function Person() {

    var create = function () {

        // create new record

        return true;
    };

    var update = function () {

        // update the record (by id)

        return true;
    };

    this._id    = null;
    this.name   = null;
    this.photo  = null;
    this.parent = null;

    this.setAttributes = function (data) {
        if (data) {
            this.name   = data.name || null;
            this.photo  = data.photo || null;
            this.parent = data.parent || null;
        }
        return this;
    };

    this.validate = function () {

        // check data for correctness

        return true;
    };

    this.save = function (skipValidation) {
        if (!skipValidation && !this.validate()) {
            return false;
        }
        if (!this._id) {
            return create();
        }
        return update();

    };

    this.delete = function () {
        // delete the record (branch: and every child)
        return true;
    };
}

exports.get = function (id) {
    if (!id) {
        return new Person();
    }
    var person = new Person();
    // TODO: findById()
    person._id = id;
    return person;
};
