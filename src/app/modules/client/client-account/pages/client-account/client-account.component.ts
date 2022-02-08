import {Component, OnDestroy, OnInit} from '@angular/core';
import {storroAnimations} from "../../../../shared/animations";
import {map, takeUntil, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {PageTitleService} from "../../../../../services/page-title.service";
import {Observable, Subject} from "rxjs";
import {Account} from "../../../../../data/types";

@Component({
  selector: 'app-client-account',
  templateUrl: './client-account.component.html',
  styleUrls: ['./client-account.component.scss'],
  animations: storroAnimations
})
export class ClientAccountComponent implements OnInit, OnDestroy {

  account: Observable<Account>;
  private destroyed = new Subject<boolean>();

  constructor(private activatedRoute: ActivatedRoute,
              private pageTitleService: PageTitleService) {
    this.pageTitleService.title = 'Account';

    this.account = this.activatedRoute.data.pipe(
      map(data => data.account),
      takeUntil(this.destroyed)
    );
  }

  ngOnInit(): void {
    this.account.subscribe(account => console.log(account));
  }


  ngOnDestroy() {
    this.destroyed.next(true);
  }

}
