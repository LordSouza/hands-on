import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { environment } from '../../../apps/events-logger/src/environment/environment';
import { ResponseData } from '../models/index';
@Injectable()
export class ProjectsUserService {
    error = new Subject<string>();

    constructor(private http: HttpClient) {}

    addUserToProject(projectId: string, userId: string, role: string) {
        const postData = { projectId: projectId, userId: userId, role: role };

        return this.http
            .post<ResponseData>(`${environment.url}/Project/User`, postData, {
                observe: 'response',
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

    createUser(
        firstname: string,
        lastname: string,
        username: string,
        email: string,
        role: string,
        photo: File,
        projectId: string
    ) {
        const formData: FormData = new FormData();
        formData.append('projectId', projectId);
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('Role', role);

        formData.append(photo.name, photo);

        this.http
            .post<ResponseData>(
                `${environment.url}/Project/User/Create`,
                formData,
                {
                    observe: 'response',
                    // headers: { 'Content-Type': 'multipart/form-data' },
                }
            )
            .subscribe(
                (responseData) => {
                    console.log(responseData.body?.messages);
                },
                (error) => {
                    this.error.next(error);
                }
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
