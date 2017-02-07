import { Component }     from "angular2/core";
import { TreeService }   from "./tree.service";

@Component({
    selector: 'tree',
    template:
        `<main>
            <div class="head">{{ title }}</div>
            <div>{{ buildTree() }}</div>
            <div class="tree">
                <div *ngFor="#node of tree">
                     <div class="node circle" title="{{ node.name }}">
                         <img src="{{ node.photo }}">
                    </div>
                    <div class="children">
                        <div *ngFor="#child of node.children">
                            <div class="node circle" title="{{ child.name }}">
                                <img src="{{ child.photo }}" alt="">
                            </div>
                            <div class="children">
                                <div *ngFor="#ch of child.children">
                                    <div class="node circle" title="{{ ch.name }}">
                                        <img src="{{ ch.photo }}" alt="">
                                        <div class="children">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </main>`,
    providers: [TreeService]
})

export class TreeComponent {
    title: string = "*** *** ***";
    tree: any[];

    constructor (treeService: TreeService) {
        this.tree = treeService.getTree();
    }

}