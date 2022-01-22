import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../api/backend/services/auth.service";
import {AuthMessageService} from "../../../../services/auth-message.service";
import {AuthFrontendService} from "../../services/auth-frontend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ResetErrorMatcher} from "./reset.error-matcher";
import {storroAnimations} from "../../../shared/animations";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
  animations: storroAnimations
})
export class ResetComponent implements OnInit {

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('passwordConfirm')?.value
    return pass === confirmPass ? null : {notSame: true}
  }

  submitted = false;
  matcher = new ResetErrorMatcher();
  error: string | null = null;
  password = new FormControl('', [Validators.required, Validators.min(6)]);
  passwordConfirm = new FormControl('', [Validators.required, Validators.min(6)]);
  registrationForm: FormGroup = new FormGroup({
    password: this.password,
    passwordConfirm: this.passwordConfirm
  }, {validators: this.checkPasswords});


  private userEmail: string|null = null;
  private resetToken: string|null = null;

  constructor(private authService: AuthService,
              private authMessageService: AuthMessageService,
              private authFrontendService: AuthFrontendService,
              private route: ActivatedRoute,
              private router: Router) {
    this.authFrontendService.title = 'Reset Password';
    this.authFrontendService.showLoginBack = true;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (!!params && params.hasOwnProperty('token')) {
        this.resetToken = params.token;

        if (!!params.user) {
          this.userEmail = params.user;
        }

      } else {
        this.router.navigate(['auth', 'login']).then();
      }
    })
  }


  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('min') ? 'Must be 6 characters minimum' : '';
  }


  reset() {
    const newPassword = this.password.value;

    if (!!this.resetToken) {
      this.authService.sendPasswordResetRequest(this.resetToken, newPassword).pipe(
        delay(1000)
      ).subscribe(res => {
        this.submitted = false;

        if (!res.success) {
          this.error = this.authMessageService.getErrorMessage(res);
        } else {
          this.router.navigate(['auth', 'success', res.message], {queryParams: {email: this.userEmail}}).then();
        }
      })
    }
  }

  get disableSubmit() {
    return this.password.invalid || this.passwordConfirm.invalid;
  }
}
