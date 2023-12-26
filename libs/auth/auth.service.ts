import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../apps/events-logger/src/environment/environment';

import { Token } from './Token.model';

export interface AuthResponseData {
    statuscode: number;
    isSuccess: boolean;
    messages: string[];
    result: {
        token: string;
    };
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    token = new BehaviorSubject<Token | null>(null);
    private tokenExpirationTimer: any;
    isLoginMode = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, private router: Router) {}

    signup(
        firstname: string,
        lastname: string,
        username: string,
        email: string,
        password: string
    ) {
        return this.http
            .post<AuthResponseData>(`${environment.url}/Auth/Register`, {
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                password: password,
            })
            .pipe(
                tap((resData) => {
                    this.handleAuthentication(
                        resData.statuscode,
                        resData.isSuccess,
                        resData.messages,
                        resData.result
                    );
                })
            );
    }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(`${environment.url}/Auth/Login`, {
                email: email,
                password: password,
                returnSecureToken: true,
            })
            .pipe(
                tap((resData) => {
                    this.handleAuthentication(
                        resData.statuscode,
                        resData.isSuccess,
                        resData.messages,
                        resData.result
                    );
                })
            );
    }

    autoLogin() {
        const userData: {
            token: string;
        } = JSON.parse(localStorage.getItem('token') || '{}');
        if (!userData) {
            return;
        }

        const loadedToken = new Token(userData.token);

        if (loadedToken.token) {
            this.token.next(loadedToken);
            this.isLoginMode.next(true);
        }
    }

    logout() {
        this.token.next(null);
        this.router.navigate(['/']);
        localStorage.removeItem('token');
        this.isLoginMode.next(false);

        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(
        statusCode: number,
        isSuccess: boolean,
        messages: string[],
        result: {
            token: string;
        }
    ) {
        const token = new Token(result.token);
        this.token.next(token);
        localStorage.setItem('token', JSON.stringify(token));
        this.isLoginMode.next(true);
    }
}
