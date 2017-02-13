import { Component }     from "angular2/core";
import { TreeService }   from "./tree.service";

@Component({
    selector: 'tree',
    templateUrl: "/app/views/tree.html",
    providers: [TreeService]
})

export class TreeComponent {
    tree: Object[];
    message: {type: "", text: ""};

    constructor (private _treeService: TreeService) {
        try {
            this.buildTree();
        } catch (e) {
            alert("Error: \"" + e.message + "\"");
        }
    }

    protected buildTree() {
        this._treeService.getTree().subscribe(
            success => this.handleData(success),
            error   => alert("Error: \"" + (error.message || "unknown error") + "\""),
            ()      => console.log('finished')
        );
    }

    protected handleData(data) {
        this.message = data.message;
        if (data.data.tree === false) {
            alert(this.message.type + ": \"" + this.message.text  + "\"");
        } else {
            this.tree = data.data.tree;
        }
    }
}