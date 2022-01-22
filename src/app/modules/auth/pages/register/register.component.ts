import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {RegisterErrorMatcher} from "./register.error-matcher";
import {AuthFrontendService} from "../../services/auth-frontend.service";
import {AuthService} from "../../../../api/backend/services/auth.service";
import {AuthMessageService} from "../../../../services/auth-message.service";
import {delay} from "rxjs/operators";
import {storroAnimations} from "../../../shared/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: storroAnimations
})
export class RegisterComponent {

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('passwordConfirm')?.value
    return pass === confirmPass ? null : {notSame: true}
  }

  submitted = false;
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

  constructor(private authService: AuthService,
              private authMessageService: AuthMessageService,
              private authFrontendService: AuthFrontendService,
              private router: Router) {
    this.authFrontendService.title = 'Register';
    this.authFrontendService.showLoginBack = true;
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


  register() {
    this.registrationForm.disable();
    this.submitted = true;

    const email = this.email.value;
    const password = this.password.value;
    const firstName = this.firstName.value;
    const lastName = this.lastName.value;

    this.authService.register(email, password, firstName, lastName).pipe(
      delay(1000)
    ).subscribe(res => {
      this.submitted = false;

      if (!res.success) {
        this.error = this.authMessageService.getErrorMessage(res);
      } else {
        this.router.navigate(['auth', 'success', res.message], {queryParams: {email}}).then();
      }
    })
  }

  get disableSubmit() {
    return this.password.invalid || this.email.invalid || this.firstName.invalid || this.lastName.invalid || this.passwordConfirm.invalid;
  }
}
