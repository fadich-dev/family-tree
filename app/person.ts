export class Person {
    _id: string;
    name: string;
    photo: string;
    parent: string;
    children: Person[];

    constructor(
        _id,
        name,
        photo,
        parent,
        children = []
    ) {
        this._id      = _id;
        this.name     = name;
        this.photo    = photo;
        this.parent   = parent;
        this.children = children;
    }
}