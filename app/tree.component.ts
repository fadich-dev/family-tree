import { Component, Input } from "angular2/core";
import { TreeService } from "./tree.service";

@Component({
    selector: 'tree',
    templateUrl: "/app/views/tree.html",
    providers: [TreeService]
})

export class TreeComponent {

    message: {type: "", text: ""};

    @Input() tree: Array<any>;

    constructor (private _treeService: TreeService) {
        try {
            this.initTree();
        } catch (e) {
            alert("Error: \"" + e.message + "\"");
        }
    }

    protected initTree() {
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