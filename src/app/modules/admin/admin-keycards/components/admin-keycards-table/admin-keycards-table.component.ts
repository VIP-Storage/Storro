import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {BehaviorSubject, merge, Observable, of, Subject} from "rxjs";
import {Keycard} from "../../../../../data/types";
import {SimpleTableEvent} from "../../../../shared/components/simple-table/simple-table.event";
import {KeycardsService} from "../../../../../api/backend/services/keycards.service";
import {MatDialog} from "@angular/material/dialog";
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {KeyCardDialogComponent} from "../../../../shared/dialogs/key-card-dialog/key-card-dialog.component";
import {storroAnimations} from "../../../../shared/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-keycards-table',
  templateUrl: './admin-keycards-table.component.html',
  styleUrls: ['./admin-keycards-table.component.scss'],
  animations: storroAnimations
})
export class AdminKeycardsTableComponent implements AfterViewInit {
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

  constructor(private keycardsService: KeycardsService, private matDialog: MatDialog,
              private router: Router) {

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

      return this.router.navigateByUrl('/admin/keycards');
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
