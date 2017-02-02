function Person() {
    this.id = null;
    this.name = null;
    this.photo = null;
    this.parent = null;
    this.create = function () {

    }

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
