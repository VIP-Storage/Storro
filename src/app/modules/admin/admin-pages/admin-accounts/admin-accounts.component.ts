import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {BehaviorSubject, merge, Observable, of, Subject} from "rxjs";
import {SimpleTableEvent} from "../../../shared/components/simple-table/simple-table.event";
import {DebugDialogService} from "../../../../services/debug-dialog.service";
import {PageTitleService} from "../../../../services/page-title.service";
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {Account} from "../../../../data/types";
import {AccountsService} from "../../../../api/backend/services/accounts.service";
import {storroAnimations} from "../../../shared/animations";
import {EntityHelper} from "../../../shared/helpers/entity.helper";
import {StatusBadge} from "../../../shared/components/status-badge/status-badge.type";

@Component({
  selector: 'app-admin-accounts',
  templateUrl: './admin-accounts.component.html',
  styleUrls: ['./admin-accounts.component.scss'],
  animations: storroAnimations
})
export class AdminAccountsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  statusBadgeValues: StatusBadge[] = [
    {
      value: true,
      display: 'Delinquent',
      color: 'error'
    },
    {
      value: false,
      display: 'Current',
      color: 'success'
    }
  ];

  displayedColumns: { name: string; title: string, noSort?: boolean }[] = [
    {
      name: 'firstName',
      title: 'Full Name'
    },
    {
      name: 'email',
      title: 'Email Address'
    },
    {
      name: 'delinquent',
      title: 'Status',
      noSort: true
    },
    {
      name: 'actions',
      title: 'Actions',
      noSort: true
    }
  ];

  accounts: Account[] = [];
  pageIndex: number = 1;
  pageSize: number = 25;
  totalAccounts: number = 0;

  isLoadingAccounts: boolean = true;
  didError: boolean = false;

  searchValue: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  searchValueChanged: Observable<string | null>;

  private tableChange: Subject<SimpleTableEvent> = new Subject<SimpleTableEvent>();
  private lastTableEvent: SimpleTableEvent | undefined;

  constructor(private debugDialogService: DebugDialogService,
              private accountsService: AccountsService,
              private pageTitleService: PageTitleService) {

    this.pageTitleService.title = 'Accounts';
    this.searchValueChanged = this.searchValue.asObservable().pipe(
      debounceTime(150),
      distinctUntilChanged()
    );
  }

  openAccountDebugDialog(account: Account) {
    this.debugDialogService.openDebugDialog('Account', account);
  }

  updateSearchValue(value: string | null) {
    if (!!value && value.length > 0) {
      this.searchValue.next(value);
    } else {
      this.searchValue.next(null)
    }
  }

  tableEventTriggered(event: SimpleTableEvent) {
    this.lastTableEvent = event;
    this.tableChange.next(event);
  }

  fullName(account: Account) {
    return EntityHelper.fullName(account);
  }

  ngAfterViewInit(): void {
    merge(this.tableChange, this.paginator.page, this.searchValueChanged)
      .pipe(
        switchMap(() => {
          const pageNumber = this.paginator.pageIndex;
          const pageSize = this.pageSize;

          let sortDirection;
          let sortBy;

          if (!!this.lastTableEvent) {
            sortDirection = this.lastTableEvent.direction;
            sortBy = this.lastTableEvent.active;
          }

          this.isLoadingAccounts = true;
          return this.accountsService.getAccounts(pageNumber, pageSize, sortBy, sortDirection, this.searchValue.value).pipe(
            catchError(() => of(null))
          )
        }),
        map(data => {
          this.isLoadingAccounts = false;
          this.didError = data === null;

          if (data === null) {
            return [];
          }

          this.totalAccounts = data.meta.totalItems;
          return data.items;
        }),
      )
      .subscribe(data => (this.accounts = data));
  }
}
