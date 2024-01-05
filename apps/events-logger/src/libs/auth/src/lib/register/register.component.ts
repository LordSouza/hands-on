import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthResponseData, AuthService } from '@hands-on/service/auth';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
@Component({
  selector: 'hands-on-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  isLoading = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    const firstname = this.signupForm.value.firstname;
    const lastname = this.signupForm.value.lastname;
    const username = this.signupForm.value.username;
    this.isLoading = true;
    const authObs: Observable<AuthResponseData> = this.authService.signup(
      firstname,
      lastname,
      username,
      email,
      password
    );
    authObs.subscribe(
      (resData) => {
        this.isLoading = false;
        console.log(resData);
        this.showSuccess('Registration Successful');
        this.router.navigate(['/home']);
      },
      (errorMessage) => {
        this.showError(errorMessage.error.messages[0]);
        this.isLoading = false;
      }
    );
    this.signupForm.reset();
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
