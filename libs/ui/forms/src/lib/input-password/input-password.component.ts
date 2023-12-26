import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'hands-on-input-password',
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.css',
})
export class InputPasswordComponent implements OnInit {
  form!: FormGroup;
  hideText: boolean = true;
  @Input() label: string = '';

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
  }

  getErrorMessage() {
    if (this.form.controls[this.label].hasError('required')) {
      return 'You must enter a value';
    }
    if (this.form.controls[this.label].hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    }

    return '';
  }
}
