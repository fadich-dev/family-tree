import { Component }     from "angular2/core";
import { TreeService }   from "./tree.service";

@Component({
    selector: 'tree',
    templateUrl: "/app/views/tree.html",
    providers: [TreeService]
})

export class TreeComponent {
    nodes: Array<any>;
    view = "/app/views/tree.html";

    constructor (treeService: TreeService) {
        this.nodes = treeService.getTree();
    }
}