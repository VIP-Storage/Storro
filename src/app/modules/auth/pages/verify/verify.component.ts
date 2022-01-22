import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {delay, filter} from "rxjs/operators";
import {AuthService} from "../../../../api/backend/services/auth.service";
import {AuthMessageService} from "../../../../services/auth-message.service";
import {storroAnimations} from "../../../shared/animations";
import {AuthFrontendService} from "../../services/auth-frontend.service";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
  animations: storroAnimations
})
export class VerifyComponent implements OnInit {

  responseMessage: string | null = null;
  submitted = false;
  token = new FormControl('', [Validators.required, Validators.min(6)]);
  error: string | null = null;
  verificationForm: FormGroup = new FormGroup({
    token: this.token
  });


  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private authFrontendService: AuthFrontendService,
              private authMessageService: AuthMessageService) {
    this.authFrontendService.title = 'Verify Email';
    this.authFrontendService.showLoginBack = true;
  }


  ngOnInit(): void {
    this.route.queryParams.pipe(
      filter(params => params.token)
    ).subscribe(params => {
        this.token.setValue(params.token);
        this.verify();
      }
    )
  }

  verify() {
    this.submitted = true;
    this.token.disable();

    this.authService.verify(this.token.value).pipe(
      delay(1000)
    ).subscribe(res => {
      if (!res.success) {
        this.error = this.authMessageService.getErrorMessage(res);
        this.token.enable();
        this.submitted = false;
      } else {
        const email: string | null = this.authMessageService.getDataValue(res, 'email');
        this.router.navigate(['auth', 'success', res.message], {queryParams: {email}}).then();
      }
    })
  }

  get disableSubmit() {
    return this.token.invalid || this.submitted;
  }
}
