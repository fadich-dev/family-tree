import { Component }     from "angular2/core";
import { TreeService }   from "./tree.service";

@Component({
    selector: 'tree',
    template:
        `<main>
            <div class="head">{{ title }}</div>
            <table class="tree">
                <tr>
                    <td *ngFor="#node of tree" width="10">
                        <div class="circle" id="{{ node._id }}" data-id="{{ node.parent }}">
                            <div class="name">{{ node.name }}</div>
                            <img src="{{ node.photo }}">
                        </div>
                        <table class="tree">
                            <tr>
                                <td *ngFor="#child of node.children">
                                <div class="circle" id="{{ child._id }}" data-id="{{ child.parent }}">
                                    <div class="name">{{ child.name }}</div>
                                    <img src="{{ child.photo }}">
                                </div>
                                <table class="tree">
                                    <tr>
                                        <td *ngFor="#ch of child.children">
                                        <div class="circle" id="{{ ch._id }}" data-id="{{ ch.parent }}">
                                            <div class="name">{{ ch.name }}</div>
                                            <img src="{{ ch.photo }}">
                                        </div>
                                    </tr>
                                </table>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
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