import { Component }     from "angular2/core";
import { TreeService }   from "./tree.service";

@Component({
    selector: 'tree',
    templateUrl: "/app/views/tree.html",
    providers: [TreeService]
})

export class TreeComponent {
    title: string = "*** *** ***";
    tree: any[];

    constructor (treeService: TreeService) {
        this.tree = treeService.getTree();
    }

}