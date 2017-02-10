import { Http, Response } from 'angular2/http';
import { Observable }     from 'rxjs/Observable';
import {Headers}          from "angular2/src/http/headers";



export class TreeService {

    public getTreeUrl: string = "http://localhost:4242/get-tree";

    constructor (private http: Http) {

    }

    public getTree(): Observable<any[]> {

        let headers = new Headers({ 'Content-Type': 'application/json', url: "/get-tree" });

        return this.http
            .post(this.getTreeUrl, '', {headers : headers})
            .map(res => res.json())
            .catch(this.handleError);
        // return [
        //     {
        //         _id: "132gy231y23y23j",
        //         name: "Grand",
        //         photo: "/some",
        //         parent: null,
        //         children: [
        //             {
        //                 _id: "78ds87dfshewr78",
        //                 name: "Some Name",
        //                 photo: null,
        //                 parent: "132gy231y23y23j",
        //                 children: [
        //                     {
        //                         _id: "67e76re7uher9",
        //                         name: "chchch Some Name",
        //                         photo: null,
        //                         parent: "78ds87dfshewr78",
        //                         children: []
        //                     },
        //                     {
        //                         _id: "889u89NIUBI78njui",
        //                         name: "chchch Some node 2",
        //                         photo: "/some",
        //                         parent: "78ds87dfshewr78",
        //                         children: []
        //                     }
        //                 ]
        //             },
        //             {
        //                 _id: "i8ekjd8fdke",
        //                 name: "Some node 2",
        //                 photo: "/some",
        //                 parent: "132gy231y23y23j",
        //                 children: []
        //             }
        //         ]
        //     }
        // ];
    }
    
    protected handleError = function (error: Response | any) {
        let errMsg: string;

        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        console.error(errMsg);

        return Observable.throw(errMsg);
    }
}
