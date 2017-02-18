import { Component, Input } from "angular2/core";
import { Http, RequestOptions } from 'angular2/http';
import 'rxjs/add/operator/map';
import {Headers} from "angular2/src/http/headers";

@Component({
    selector: 'person-form-modal',
    templateUrl: '/app/views/person-form-modal.html'
})

export class PersonFormComponent {
    protected sent: boolean = false;

    @Input() nodes;
    @Input() person;
    @Input() behaviour;
    @Input() modalId;

    constructor (private http: Http) {  }

    public submitForm() {
        if (!this.sent) {

            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            this.http
                .post('/person/' + this.person._id + '/update', JSON.stringify(this.person), options)
                .map(res => res.json())
                .subscribe(
                    success => this.handleSuccess(success),
                    error   => this.handleError(error),
                    ()      => console.log('The tree initialization has been finished finished')
            )
        } else {
            alert("Data was sent");
        }
    }

    protected handleSuccess(data) {
        if (data.message) {
            if (data.message.type == "success") {
                this.sent = true;
            }
            alert(data.message.type + ": " + data.message.text)
        }
    }

    protected handleError(data) {
        alert("Error: \"" + (data.message || "unknown error") + "\"") || console.log(data);
        this.sent = true;
    }
}