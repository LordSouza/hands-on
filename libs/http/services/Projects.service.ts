import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { environment } from '../../../apps/events-logger/src/environment/environment';
import {
    ResponseData,
    Project,
    Address,
    ProjectRespose,
} from '../models/index';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
    error = new Subject<string>();

    constructor(private http: HttpClient) {}

    createAndStoreProjects(name: string, address: Address) {
        const postData: Project = { name: name, address: address };

        this.http
            .post<ResponseData>(`${environment.url}/Project`, postData, {
                observe: 'response',
            })
            .subscribe(
                (responseData) => {
                    console.log(responseData.body?.messages);
                },
                (error) => {
                    this.error.next(error.message);
                }
            );
    }

    fetchAllProjects() {
        return this.http
            .get<ResponseData>(`${environment.url}/Project`, {
                headers: new HttpHeaders({
                    Accept: 'application/json',
                }),
            })
            .pipe(
                map((responseData: any) => {
                    const projectsArray: ProjectRespose[] = [];

                    for (const project in responseData.result) {
                        if (responseData.result.hasOwnProperty(project)) {
                            projectsArray.push({
                                ...responseData.result[project],
                                name: responseData.result[project].project.name,
                            });
                        }
                    }

                    return projectsArray;
                }),
                catchError((errorRes) => {
                    // Send to analytics server
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
