import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {Keycard} from "../../../../../data/types";
import {BehaviorSubject, merge, Observable, of, Subject} from "rxjs";
import {SimpleTableEvent} from "../../../../shared/components/simple-table/simple-table.event";
import {PageTitleService} from "../../../../../services/page-title.service";
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {KeycardsService} from "../../../../../api/backend/services/keycards.service";
import {storroAnimations} from "../../../../shared/animations";
import {PageHeaderAction} from "../../../../shared/components/page-header/page-header.action";
import {MatDialog} from "@angular/material/dialog";
import {KeyCardDialogComponent} from "../../../../shared/dialogs/key-card-dialog/key-card-dialog.component";

@Component({
  selector: 'app-admin-keycards',
  templateUrl: './admin-keycards.component.html',
  styleUrls: ['./admin-keycards.component.scss'],
  animations: storroAnimations
})
export class AdminKeycardsComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: { name: string; title: string, noSort?: boolean }[] = [
    {
      name: 'cardName',
      title: 'Card Name'
    },
    {
      name: 'email',
      title: 'Owner Email Address'
    },
    {
      name: 'cardCode',
      title: 'Card Code',
      noSort: true
    },
    {
      name: 'facilityCode',
      title: 'Facility Code',
      noSort: true
    },
  ];

  pageHeaderActions: PageHeaderAction[] = [
    {
      title: 'Create Key Card',
      icon: 'add',
      routerLink: '/admin/keycards/create'
    },
  ]

  reloadData: Subject<any> =  new Subject<any>();
  keyCards: Keycard[] = [];
  pageIndex: number = 1;
  pageSize: number = 25;
  totalKeyCards: number = 0;

  isLoadingKeyCards: boolean = true;
  didError: boolean = false;

  searchValue: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  searchValueChanged: Observable<string | null>;

  private tableChange: Subject<SimpleTableEvent> = new Subject<SimpleTableEvent>();
  private lastTableEvent: SimpleTableEvent | undefined;

  constructor(private keycardsService: KeycardsService,
              private matDialog: MatDialog,
              private pageTitleService: PageTitleService) {

    this.pageTitleService.title = 'Key Cards';
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

  viewKeyCard(keyCard: Keycard) {
    this.matDialog.open(KeyCardDialogComponent, {
      panelClass: KeyCardDialogComponent.panelClass,
      data: keyCard,
    }).afterClosed().subscribe(keyCard => {
      if (!!keyCard) {
        this.reloadData.next(true);
      }
    })
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

          this.isLoadingKeyCards = true;

          return this.keycardsService.getKeycards(pageNumber, pageSize, sortBy, sortDirection, this.searchValue.value).pipe(
            catchError(() => of(null))
          )
        }),
        map(data => {
          this.isLoadingKeyCards = false;
          this.didError = data === null;

          if (data === null) {
            return [];
          }

          this.totalKeyCards = data.meta.totalItems;
          return data.items;
        }),
      )
      .subscribe(data => (this.keyCards = data));
  }
}
