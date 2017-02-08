import { Component }     from "angular2/core";
import { TreeComponent } from "./tree.component";

@Component({
    selector: 'my-app',
    template:
        `<header>
            <div class="title">
                <h1 class="head">Family-tree</h1>
                <p class="footnote">Though it is more like a scheme of the network marketing</p>
            </div>
        </header>
        <main>
            <div class="head">*** *** ***</div>
            <tree></tree>
        </main>`,
    directives: [TreeComponent]
})

export class AppComponent { }
