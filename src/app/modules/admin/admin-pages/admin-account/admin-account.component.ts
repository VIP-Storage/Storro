import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PageTitleService} from "../../../../services/page-title.service";
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {Account} from "../../../../data/types/accounts";
import {ViewMode} from "../../../../data/enums";
import {storroAnimations} from "../../../shared/animations";

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.scss'],
  animations: storroAnimations
})
export class AdminAccountComponent implements OnInit {

  account: Observable<Account>;
  viewMode: ViewMode = ViewMode.CREATE;

  constructor(private activatedRoute: ActivatedRoute,
              private pageTitleService: PageTitleService) {
    this.pageTitleService.title = 'Account';
    this.account = this.activatedRoute.data.pipe(
      map(data => data.account),
      tap(() => this.viewMode = ViewMode.EDIT)
    );
  }

  ngOnInit(): void {
  }

}
