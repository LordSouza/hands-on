import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPasswordComponent } from './input-password/input-password.component';
import { InputEmailComponent } from './input-email/input-email.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InputTextComponent } from './input-text/input-text.component';
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  declarations: [
    InputPasswordComponent,
    InputEmailComponent,
    InputTextComponent,
  ],
  exports: [InputPasswordComponent, InputEmailComponent, InputTextComponent],
})
export class FormsModule {}
