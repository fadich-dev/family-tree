import { Component }     from "angular2/core";
import { TreeService }   from "./tree.service";
import {Observable}      from "rxjs";

@Component({
    selector: 'tree',
    templateUrl: "/app/views/tree.html",
    providers: [TreeService]
})

export class TreeComponent {
    nodes: Observable<any[]>;
    view = "/app/views/tree.html";

    constructor (treeService: TreeService) {
        try {
            this.nodes = treeService.getTree();
        } catch (e) {
            this.nodes = new Observable();
        }
    }
}