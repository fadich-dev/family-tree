function Person() {
    var create = function () {
        // create new record
        return true;
    };
    var update = function () {
        // update the record (by id)
        return true;
    };

    this.id = null;
    this.name = null;
    this.photo = null;
    this.parent = null;
    this.save = function () {
        if (!this.id) {
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
    person.id = id;
    return person;
};
