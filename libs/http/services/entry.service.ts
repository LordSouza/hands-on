import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';

import { Subject, map, catchError, throwError, tap } from 'rxjs';

import { environment } from '../../../apps/events-logger/src/environment/environment';
import { Entry, ResponseData, Project } from '../models/index';

@Injectable({
    providedIn: 'root',
})
export class EntryService {
    error = new Subject<string>();

    constructor(private http: HttpClient) {}

    postEntry(projectId: string, description: string, file: File) {
        const formData: FormData = new FormData();
        formData.append('projectid', projectId);
        formData.append('Description', description);
        const blob = new Blob([file]);
        formData.append('Files', blob, file.name);

        this.http
            .post<ResponseData>(`${environment.url}/Entry`, formData, {
                observe: 'response',
                // headers: { 'Content-Type': 'multipart/form-data' },
            })
            .subscribe(
                (responseData) => {
                    console.log(responseData.body?.messages);
                },
                (error) => {
                    this.error.next(error);
                }
            );
    }

    fetchAllEntries(
        page: number,
        limit: number,
        userid?: string,
        projectid?: string,
        description?: string,
        hasfiles?: boolean
    ) {
        const list: { name: string; value: any | undefined }[] = [
            {
                name: 'userid',
                value: userid,
            },
            {
                name: 'projectid',
                value: projectid,
            },
            {
                name: 'entrydescription',
                value: description,
            },
            {
                name: 'hasfiles',
                value: hasfiles,
            },
        ];
        let paramSet = new HttpParams()
            .set('pageNumber', page)
            .set('pageSize', limit);

        for (const item of list) {
            if (item.value !== undefined) {
                paramSet = paramSet.set(item.name, item.value);
            }
        }

        return this.http
            .get<ResponseData>(`${environment.url}/Entry`, {
                params: paramSet,
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
