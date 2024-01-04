import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthResponseData, AuthService } from '@hands-on/service/auth';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
@Component({
    selector: 'hands-on-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    isLoading = false;
    error: string = '';

    constructor(
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
            ]),
        });
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;

        this.isLoading = true;

        const authObs: Observable<AuthResponseData> = this.authService.login(
            email,
            password
        );

        authObs.subscribe(
            () => {
                this.showSuccess('Login Successful');
                this.isLoading = false;
                this.router.navigate(['/home'], {});
                this.loginForm.reset();
            },
            (errorMessage) => {
                this.showError(errorMessage.error.messages[0]);
                console.log(errorMessage);
                this.error = errorMessage;
                this.isLoading = false;
            }
        );
    }

    showSuccess(Message: string) {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: Message,
        });
    }
    showError(Message: string) {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: Message,
        });
    }
    onCancel() {
        this.router.navigate(['/'], {});
    }
}
