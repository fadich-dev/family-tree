import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import 'rxjs/add/operator/map';


@Injectable()
export class TreeService {

    public getTreeUrl: string = "http://localhost:4242/get-tree";

    constructor (private http: Http) {

    }

    public getTree() {
        return this.http
            .post(this.getTreeUrl, '')
            .map(res => res.json());
    }
}
