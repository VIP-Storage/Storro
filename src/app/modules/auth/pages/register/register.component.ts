import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {RegisterErrorMatcher} from "./register.error-matcher";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('passwordConfirm')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  matcher = new RegisterErrorMatcher();
  error: string | null = null;
  email = new FormControl('', [Validators.required, Validators.email]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.min(6)]);
  passwordConfirm = new FormControl('', [Validators.required, Validators.min(6)]);
  registrationForm: FormGroup = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    password: this.password,
    passwordConfirm: this.passwordConfirm
  }, {validators: this.checkPasswords});

  constructor() { }

  ngOnInit(): void {
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('min') ? 'Must be 6 characters minimum' : '';
  }


  register() {}

  disableButton() {
    return this.password.invalid || this.email.invalid || this.firstName.invalid || this.lastName.invalid || this.passwordConfirm.invalid;
  }
}
