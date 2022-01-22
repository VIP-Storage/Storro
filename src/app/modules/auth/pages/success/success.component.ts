import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthMessageService} from "../../../../services/auth-message.service";
import {AuthFrontendService} from "../../services/auth-frontend.service";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  loginEmail: string | null = null;
  messages: string[] = [];
  scope: string = 'REGISTRATION';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authMessageService: AuthMessageService,
              private authFrontendService: AuthFrontendService) {
    this.authFrontendService.title = 'Success';
    this.authFrontendService.showLoginBack = true;
  }

  ngOnInit(): void {
    combineLatest([this.route.params, this.route.queryParams]).pipe(
      map(allParams => allParams.reduce(function (acc, x) {
        for (const key in x) acc[key] = x[key];
        return acc;
      }, {}))
    ).subscribe(params => {
      const responseDetails = this.authMessageService.getMessageDetails(params);

      this.loginEmail = params.email;
      this.scope = responseDetails.scope;
      this.messages = responseDetails.message.split('\n');
    })
  }

  get showVerifyButton() {
    return this.scope === 'REGISTRATION';
  }

  get showLoginButton() {
    return this.scope === 'LOGIN' || this.scope === 'RESET_PASSWORD';
  }

  goToLogin() {
    if (!!this.loginEmail) {
      return this.router.navigate(['auth', 'login'], {queryParams: {email: this.loginEmail}})
    }

    return this.router.navigate(['auth', 'login'])
  }
}
