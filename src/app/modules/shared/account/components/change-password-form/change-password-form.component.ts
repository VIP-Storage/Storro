import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {RegisterErrorMatcher} from "../../../../auth/pages/register/register.error-matcher";
import {IResponse, User} from "../../../../../data";
import {AuthService} from "../../../../../api/backend/services/auth.service";
import {UserService} from "../../../../../api/backend/services/user.service";

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent {

  @Output()
  passwordReset: EventEmitter<IResponse> = new EventEmitter<IResponse>();

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('newPassword')?.value;
    let confirmPass = group.get('newPasswordConfirm')?.value
    return pass === confirmPass ? null : {notSame: true}
  }

  submitted = false;
  matcher = new RegisterErrorMatcher();
  error: string | null = null;
  currentPassword = new FormControl('', [Validators.required, Validators.min(6)]);
  newPassword = new FormControl('', [Validators.required, Validators.min(6)]);
  newPasswordConfirm = new FormControl('', [Validators.required, Validators.min(6)]);
  resetForm: FormGroup = new FormGroup({
    currentPassword: this.currentPassword,
    newPassword: this.newPassword,
    newPasswordConfirm: this.newPasswordConfirm,
  }, {validators: this.checkPasswords});

  private currentUser?: User;

  constructor(private authService: AuthService,
              private userService: UserService) {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }

  getErrorMessage(formControl: FormControl, displayLabel?: string) {
    if (!formControl) {
      console.warn(`FormControl '${formControl}' is null or undefined`);
      return '';
    }

    const label = (displayLabel ? displayLabel : 'value');

    if (formControl.hasError('email')) {
      return `'${formControl.value}' is not a valid email address`;
    } else if (formControl.hasError('required')) {
      return `You must enter a ${label}`;
    } else if (formControl.hasError('minlength')) {
      return `'${formControl.value}' is too short of a ${label}`;
    } else if (formControl.hasError('mask')) {
      const requiredValue = formControl.getError('mask').requiredMask;

      return `'${formControl.value}' is not a valid ${label}, must be in format ${requiredValue}`;
    } else if (formControl.hasError('validateExpiration')) {
      return formControl.getError('validateExpiration').message;
    }

    return '';
  }

  get disableSubmit() {
    return this.resetForm.invalid || this.submitted;
  }

  resetPassword() {
    if (!this.currentUser) {
      return;
    }

    this.submitted = true;
    this.error = null;

    this.authService.resetPassword(this.currentUser.email, this.currentPassword.value, this.newPassword.value).subscribe(response => {
      if (response.success) {
        this.passwordReset.emit(response);
      } else {
        this.error = response.message || response.errorMessage;
        this.submitted = false;
      }
    })
  }
}
