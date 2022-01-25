import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../api/backend/services/auth.service";
import {filter} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthFrontendService} from "../../services/auth-frontend.service";
import {AuthMessageService} from "../../../../services/auth-message.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string | null = null;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.min(6)]);
  loginForm: FormGroup = new FormGroup({
    email: this.email,
    password: this.password
  });

  constructor(private authService: AuthService,
              private authMessageService: AuthMessageService,
              private authFrontendService: AuthFrontendService,
              private route: ActivatedRoute,
              private router: Router) {
    this.authFrontendService.title = 'Welcome';
    this.authFrontendService.showLoginBack = false;
  }

  ngOnInit() {
    this.route.queryParams.pipe(
      filter(params => params.email)
    ).subscribe(params => {
      if (params.hasOwnProperty('email') && !!params.email) {
        this.email.setValue(params.email);
      }
    })
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

    this.authService.login(this.email.value, this.password.value).subscribe(response => {
      if (response.success) {
        this.router.navigate(['client', 'dashboard']).then();
      } else {
        this.error = this.authMessageService.getErrorMessage(response);
      }
    });
  }
}
