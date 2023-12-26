import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { authRoutes } from './lib.routes';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { FormsModule } from '@hands-on/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    ToastModule,
    ReactiveFormsModule,
    ButtonModule,
    StyleClassModule,
    FormsModule,
  ],
  providers: [MessageService],
  declarations: [RegisterComponent, LoginComponent],
})
export class AuthModule {}
