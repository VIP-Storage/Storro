import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../api/backend/services/auth.service";
import {Router} from "@angular/router";
import {AuthFrontendService} from "../../services/auth-frontend.service";
import {AuthMessageService} from "../../../../services/auth-message.service";

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

  constructor(private authService: AuthService,
              private authMessageService: AuthMessageService,
              private authFrontendService: AuthFrontendService,
              private router: Router) {
    this.authFrontendService.title = 'Reset Password';
    this.authFrontendService.showLoginBack = true;
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  reset() {
    this.error = null;

    this.authService.sendPasswordResetEmail(this.email.value).subscribe(res => {
      if (!res.success) {
        this.error = this.authMessageService.getErrorMessage(res);
      } else {
        this.router.navigate(['auth', 'success', res.message], {queryParams: {email: this.email.value}}).then();
      }
    });
  }

}
