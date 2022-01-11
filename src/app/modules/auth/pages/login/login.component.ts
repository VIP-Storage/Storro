import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../api/backend/services/auth.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  error: string | null = null;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.min(6)]);
  loginForm: FormGroup = new FormGroup({
    email: this.email,
    password: this.password
  });

  constructor(private authService: AuthService, private router: Router) {
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

  login() {
    this.error = null;

    this.authService.login(this.email.value, this.password.value).pipe(
      catchError((err) => {
        this.error = 'Invalid username or password'
        console.error(err);
        return of(false);
      })
    ).subscribe(response => {
      if (!!response) {
        this.router.navigate(['client', 'dashboard']).then();
      }
    });
  }
}
