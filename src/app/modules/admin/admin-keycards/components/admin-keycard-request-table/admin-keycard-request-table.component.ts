import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {BehaviorSubject, merge, Observable, of, Subject} from "rxjs";
import {KeycardRequest} from "../../../../../data/types";
import {SimpleTableEvent} from "../../../../shared/components/simple-table/simple-table.event";
import {KeycardsService} from "../../../../../api/backend/services/keycards.service";
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {DebugDialogService} from "../../../../../services/debug-dialog.service";
import {StatusBadge} from "../../../../shared/components/status-badge/status-badge.type";
import {KeycardRequestState} from "../../../../../data/enums";
import {storroAnimations} from "../../../../shared/animations";

@Component({
  selector: 'app-admin-keycard-request-table',
  templateUrl: './admin-keycard-request-table.component.html',
  styleUrls: ['./admin-keycard-request-table.component.scss'],
  animations: storroAnimations
})
export class AdminKeycardRequestTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: { name: string; title: string, noSort?: boolean }[] = [
    {
      name: 'requestedBy.firstName',
      title: 'Requested By'
    },
    {
      name: 'request.requestedOn',
      title: 'Requested On'
    },
    {
      name: 'request.state',
      title: 'State',
    },
  ];


  statusBadgeValues: StatusBadge[] =  [
    {
      value: KeycardRequestState.Pending,
      display: 'Pending',
      color: 'warn'
    },
    {
      value: KeycardRequestState.Denied,
      display: 'Denied',
      color: 'error'
    },
    {
      value: KeycardRequestState.Approved,
      display: 'Approved',
      color: 'success'
    }
  ];


  reloadData: Subject<any> =  new Subject<any>();
  requests: KeycardRequest[] = [];
  pageIndex: number = 1;
  pageSize: number = 25;
  totalRequests: number = 0;

  isLoadingRequests: boolean = true;
  didError: boolean = false;

  searchValue: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  searchValueChanged: Observable<string | null>;

  private tableChange: Subject<SimpleTableEvent> = new Subject<SimpleTableEvent>();
  private lastTableEvent: SimpleTableEvent | undefined;

  constructor(private keycardsService: KeycardsService, private debugDialogService: DebugDialogService) {
    this.searchValueChanged = this.searchValue.asObservable().pipe(
      debounceTime(150),
      distinctUntilChanged()
    );
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

  ngAfterViewInit(): void {
    merge(this.tableChange, this.paginator.page, this.searchValueChanged, this.reloadData)
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

          this.isLoadingRequests = true;

          return this.keycardsService.getKeycardRequests(pageNumber, pageSize, sortBy, sortDirection, this.searchValue.value).pipe(
            catchError(() => of(null))
          )
        }),
        map(data => {
          this.isLoadingRequests = false;
          this.didError = data === null;

          if (data === null) {
            return [];
          }

          this.totalRequests = data.meta.totalItems;
          return data.items;
        }),
      )
      .subscribe(data => (this.requests = data));
  }

}
