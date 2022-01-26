import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {User} from "../../../../data/types";
import {BehaviorSubject, merge, Observable, of, Subject} from "rxjs";
import {catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap} from "rxjs/operators";
import {UserService} from "../../../../api/backend/services/user.service";
import {SimpleTableEvent} from "../../../shared/components/simple-table/simple-table.event";
import {DebugDialogService} from "../../../../services/debug-dialog.service";
import {MatDialog} from "@angular/material/dialog";
import {PageTitleService} from "../../../../services/page-title.service";
import {CreateUserDialogComponent} from "../../../shared/dialogs/create-user-dialog/create-user-dialog.component";
import {Role} from "../../../../data/enums";
import {EditUserDialogComponent} from "../../../shared/dialogs/edit-user-dialog/edit-user-dialog.component";
import {storroAnimations} from "../../../shared/animations";
import {PageHeaderAction} from "../../../shared/components/page-header/page-header.action";
import {StatusBadge} from "../../../shared/components/status-badge/status-badge.type";
import {EntityHelper} from "../../../shared/helpers/entity.helper";

@Component({
  selector: 'app-admin-tenants',
  templateUrl: './admin-tenants.component.html',
  styleUrls: ['./admin-tenants.component.scss'],
  animations: storroAnimations
})
export class AdminTenantsComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  statusBadgeValues: StatusBadge[] =  [
    {
      value: true,
      display: 'Validated',
      color: 'success'
    },
    {
      value: false,
      display: 'Pending Validation',
      color: 'warn'
    }
  ];


  displayedColumns: { name: string; title: string }[] = [
    {
      name: 'firstName',
      title: 'Full Name'
    },
    {
      name: 'role',
      title: 'Role'
    },
    {
      name: 'email',
      title: 'Email Address'
    },
    {
      name: 'emailValidated',
      title: 'Account Validated'
    },
    {
      name: 'actions',
      title: 'Actions'
    }
  ];

  tenants: User[] = [];

  pageHeaderActions: PageHeaderAction[] = [
    {
      title: 'Add Tenant',
      icon: 'add',
      clickAction: () => {
        this.openCreateUserDialog()
      }
    },
  ];

  pageIndex: number = 1;
  pageSize: number = 25;
  totalTenants: number = 0;

  isLoadingTenants: boolean = true;
  didError: boolean = false;

  searchValue: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);
  searchValueChanged: Observable<string|null>;

  private tableChange: Subject<SimpleTableEvent> = new Subject<SimpleTableEvent>();
  private lastTableEvent: SimpleTableEvent|undefined;

  constructor(private debugDialogService: DebugDialogService,
              private userService: UserService,
              private matDialog: MatDialog,
              private pageTitleService: PageTitleService) {

    this.pageTitleService.title = 'Tenants';
    this.searchValueChanged = this.searchValue.asObservable().pipe(
      debounceTime(150),
      distinctUntilChanged()
    );
  }

  openCreateUserDialog() {
    this.matDialog.open(CreateUserDialogComponent, {
      panelClass: CreateUserDialogComponent.panelClass,
      data: Role.Tenant
    });
  }

  openUserDebugDialog(user: User) {
    this.debugDialogService.openDebugDialog(user.firstName, user);
  }

  openEditUserDialog(user: User) {
    this.matDialog.open(EditUserDialogComponent, {
      panelClass: EditUserDialogComponent.panelClass,
      data: user
    });
  }

  fullName(user: User) {
    return EntityHelper.fullName(user);
  }

  updateSearchValue(value: string|null) {
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

  ngAfterViewInit(): void {
    merge(this.tableChange, this.paginator.page, this.searchValueChanged)
      .pipe(
        startWith({}),
        switchMap(() => {
          const pageNumber = this.paginator.pageIndex;
          const pageSize = this.pageSize;

          let sortDirection;
          let sortBy;

          if (!!this.lastTableEvent) {
            sortDirection = this.lastTableEvent.direction;
            sortBy = this.lastTableEvent.active;
          }

          this.isLoadingTenants = true;
          return this.userService.getTenants(pageNumber, pageSize, sortBy, sortDirection, this.searchValue.value).pipe(
            catchError(() => of(null))
          )
        }),
        map(data => {
          this.isLoadingTenants = false;
          this.didError = data === null;

          if (data === null) {
            return [];
          }

          this.totalTenants = data.meta.totalItems;
          return data.items;
        }),
      )
      .subscribe(data => (this.tenants = data));
  }
}
