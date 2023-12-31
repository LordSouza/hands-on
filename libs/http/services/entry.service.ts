import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';

import { Subject, map, catchError, throwError, tap } from 'rxjs';

import { environment } from '../../../apps/events-logger/src/environment/environment';
import { Entry, ResponseData, Project, User } from '../models/index';

@Injectable({
    providedIn: 'root',
})
export class EntryService {
    error = new Subject<string>();

    constructor(private http: HttpClient) {}

    // postEntry(name: string, address: Address) {
    //     const postData: Entry = { name: name, address: address };

    //     this.http
    //         .post<ResponseData>(`${environment.url}/Project`, postData, {
    //             observe: 'response',
    //         })
    //         .subscribe(
    //             (responseData) => {
    //                 console.log(responseData.body?.messages);
    //             },
    //             (error) => {
    //                 this.error.next(error.message);
    //             }
    //         );
    // }

    fetchAllEntries() {
        return this.http
            .get<ResponseData>(`${environment.url}/Entry`, {
                headers: new HttpHeaders({
                    Accept: 'application/json',
                }),
            })
            .pipe(
                map((responseData: any) => {
                    const entryArray: Entry[] = [];

                    for (const entry in responseData.result) {
                        if (responseData.result.hasOwnProperty(entry)) {
                            entryArray.push(responseData.result[entry]);
                        }
                    }

                    return entryArray;
                }),
                catchError((errorRes) => {
                    return throwError(errorRes);
                })
            );
    }

    fetchProject(id: string) {
        return this.http
            .get<ResponseData>(`${environment.url}/Project/${id}`)
            .pipe(
                map((responseData) => {
                    const project: Project = responseData.result;

                    return project;
                }),
                catchError((errorRes) => {
                    // Send to analytics server
                    return throwError(errorRes);
                })
            );
    }

    deleteProject(id: string) {
        return this.http
            .delete(`${environment.url}/Project/${id}`, {
                observe: 'events',
            })
            .pipe(
                tap((event) => {
                    console.log(event);

                    if (event.type === HttpEventType.Response) {
                        console.log(event.body);
                    }
                })
            );
    }
}
