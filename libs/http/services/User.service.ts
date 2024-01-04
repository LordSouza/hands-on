import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { environment } from '../../../apps/events-logger/src/environment/environment';
import { ResponseData, User } from '../models/index';

@Injectable({ providedIn: 'root' })
export class UserService {
    error = new Subject<string>();

    constructor(private http: HttpClient) {}

    fetchAllUsers() {
        return this.http
            .get<ResponseData>(`${environment.url}/User/all`, {
                headers: new HttpHeaders({
                    Accept: 'application/json',
                }),
            })
            .pipe(
                map((responseData: any) => {
                    const usersArray: User[] = [];

                    for (const user in responseData.result) {
                        if (responseData.result.hasOwnProperty(user)) {
                            usersArray.push({
                                ...responseData.result[user],
                            });
                        }
                    }

                    return usersArray;
                }),
                catchError((errorRes) => {
                    // Send to analytics server
                    return throwError(errorRes);
                })
            );
    }

    fetchUser(id: string) {
        return this.http
            .get<ResponseData>(`${environment.url}/User/${id}`)
            .pipe(
                map((responseData) => {
                    const user: User = responseData.result;

                    return user;
                }),
                catchError((errorRes) => {
                    // Send to analytics server
                    return throwError(errorRes);
                })
            );
    }

    deleteUser(id: string) {
        return this.http
            .delete(`${environment.url}/User/${id}`, {
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
