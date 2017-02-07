import { Component }                        from "angular2/core";
import { TreeService }                      from "./tree.service";

@Component({
    selector: 'tree',
    template:
        `<main>
            <div class="head">{{ title }}</div>
            <div>{{ buildTree() }}</div>
        </main>`
})

export class TreeComponent {
    title: string = "*** *** ***";
    buildTree = function () {
        return "";
    }
}