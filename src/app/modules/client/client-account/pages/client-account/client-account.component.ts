import {Component, OnDestroy, OnInit} from '@angular/core';
import {storroAnimations} from "../../../../shared/animations";
import {map, takeUntil, tap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {PageTitleService} from "../../../../../services/page-title.service";
import {Observable, Subject} from "rxjs";
import {Account, User} from "../../../../../data";
import {AlertService} from "../../../../../services/alert.service";

@Component({
  selector: 'app-client-account',
  templateUrl: './client-account.component.html',
  styleUrls: ['./client-account.component.scss'],
  animations: storroAnimations
})
export class ClientAccountComponent implements OnInit, OnDestroy {

  account: Observable<Account>;
  user: Observable<User>;
  private destroyed = new Subject<boolean>();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private pageTitleService: PageTitleService) {
    this.pageTitleService.title = 'Account';

    this.account = this.activatedRoute.data.pipe(
      map(data => data.account),
      takeUntil(this.destroyed)
    );

    this.user = this.account.pipe(
      map(account => account.accountHolder)
    );
  }

  ngOnInit(): void {
    this.account.subscribe(account => console.log(account));
  }


  ngOnDestroy() {
    this.destroyed.next(true);
  }

  goToCredentials() {
    return this.router.navigate(['credentials'], {relativeTo: this.activatedRoute});
  }

  goToPersonal() {
    return this.router.navigate(['personal'], {relativeTo: this.activatedRoute});
  }

  goToPasswordReset() {
    return this.router.navigate(['password'], {relativeTo: this.activatedRoute});
  }

  insultUser() {
    this.alertService.setCurrentAlert({
      type: 'warning',
      message: 'If you need help, please seek it'
    });
  }

  alertClipboard() {
    this.alertService.setCurrentAlert({
      type: 'success',
      message: 'Your Shared Access Code has been copied to your clipboard'
    });
  }
}
