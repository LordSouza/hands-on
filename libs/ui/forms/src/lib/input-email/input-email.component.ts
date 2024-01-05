import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'hands-on-input-email',
  templateUrl: './input-email.component.html',
  styleUrl: './input-email.component.css',
})
export class InputEmailComponent implements OnInit {
  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
  }

  getErrorMessage() {
    if (this.form.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.controls['email'].hasError('email')
      ? 'Not a valid email'
      : '';
  }
}
