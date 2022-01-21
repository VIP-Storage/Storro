import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../api/backend/services/auth.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  error: string | null = null;
  email = new FormControl('', [Validators.required, Validators.email]);

  resetForm: FormGroup = new FormGroup({
    email: this.email,
  });

  constructor(private authService: AuthService, private router: Router) {
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  reset() {
    this.error = null;

    this.authService.sendPasswordResetEmail(this.email.value).pipe(
      catchError((err) => {
        this.error = 'Invalid username or password'
        console.error(err);
        return of(false);
      })
    ).subscribe(response => {
      if (!!response) {
        this.router.navigate(['auth', 'login']).then();
      }
    });
  }

}
