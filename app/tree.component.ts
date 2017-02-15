import { Component, Input } from "angular2/core";
import { TreeService } from "./tree.service";
import {BehaviouralService} from "./behavioural.service";

@Component({
    selector: 'tree',
    templateUrl: '/app/views/tree.html',
    directives: [TreeComponent],
    providers:  [TreeService, BehaviouralService]
})

export class TreeComponent {

    protected nodes: Array<any> = [];

    public message: {type: "", text: ""};

    @Input() tree: Array<any>;

    constructor (
        private _treeService: TreeService,
        public  behaviour: BehaviouralService
    ) {
        try {
            this.initTree();
        } catch (e) {
            alert("Error: \"" + e.message + "\"");
        }
    }

    public initTree() {
        this._treeService.getTree().subscribe(
            success => this.handleData(success),
            error   => alert("Error: \"" + (error.message || "unknown error") + "\"") || console.log(error),
                ()  => console.log('The tree initialization has been finished finished')
        );
    }

    protected handleData(data) {
        this.message = data.message;
        if (data.data.tree === false) {
            alert(this.message.type + ": \"" + this.message.text  + "\"");
        } else {
            this.nodes = data.data.tree;
            this.tree  = this.tree ? this.tree : this.buildTree();
        }
    }

    protected buildTree(parent = null) {
        let tree = [];
        let i = 0;

        for (let j = this.nodes.length - 1; j >= 0; j--) {
            if (this.nodes[j].parent == parent) {
                tree[i] = this.nodes[j];
                tree[i].children = this.buildTree(tree[i]._id);
                i++;
            }
        }

        return tree;
    }
}