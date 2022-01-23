import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Unit, UnitType} from "../../../../data/types";
import {merge, Observable, of, Subject} from "rxjs";
import {catchError, map, startWith, switchMap, tap} from "rxjs/operators";
import {UnitsService} from "../../../../api/backend/services/units.service";
import {SimpleTableEvent} from "../../../shared/components/simple-table/simple-table.event";
import {PageTitleService} from "../../../../services/page-title.service";
import {MatPaginator} from "@angular/material/paginator";
import {UnitTypesService} from "../../../../api/backend/services/unit-types.service";
import {CurrencyPipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {CreateUnitComponent} from "../../components/create-unit/create-unit.component";
import {CreateUnitTypeComponent} from "../../components/create-unit-type/create-unit-type.component";

@Component({
  selector: 'app-admin-units',
  templateUrl: './admin-units.component.html',
  styleUrls: ['./admin-units.component.scss']
})
export class AdminUnitsComponent implements AfterViewInit {
  displayedColumns: {name: string; title: string}[] = [
    {
      name: 'id',
      title: 'Unit ID'
    },
    {
      name: 'available',
      title: 'Available'
    },
  ];

  unitTypes!: Observable<UnitType[]>;
  data: Unit[] = [];

  pageIndex: number = 0;
  pageSize: number = 25;
  totalUnits = 0;
  totalUnitTypes = 0;
  isLoadingUnits = true;
  didError = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private currencyPipe: CurrencyPipe = new CurrencyPipe('en');
  private lastTableEvent: Subject<SimpleTableEvent> = new Subject<SimpleTableEvent>();

  constructor(private unitsService: UnitsService,
              private unitTypesService: UnitTypesService,
              private pageTitleService: PageTitleService,
              private matDialog: MatDialog) {
    this.pageTitleService.title = 'Units';
    this.reloadUnitTypes();
  }

  openCreateUnitDialog() {
    const dialogRef = this.matDialog.open(CreateUnitComponent, {
      panelClass: 'create-unit-dialog'
    });
  }

  openCreateUnitTypeDialog() {
    const dialogRef = this.matDialog.open(CreateUnitTypeComponent, {
      panelClass: 'create-unit-type-dialog'
    })
  }

  tableEventTriggered(event: SimpleTableEvent) {
    this.lastTableEvent.next(event);
  }

  ngAfterViewInit() {
    merge(this.lastTableEvent, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          const pageNumber = this.paginator.pageIndex;
          const pageSize = this.pageSize;

          this.isLoadingUnits = true;
          return this.unitsService.getUnits(pageNumber, pageSize).pipe(
            catchError(() => of(null))
          )
        }),
        map(data => {
          this.isLoadingUnits = false;
          this.didError = data === null;

          if (data === null) {
            return [];
          }

          this.totalUnits = data.meta.totalItems;
          return data.items;
        }),
      )
      .subscribe(data => (this.data = data));
  }

  getTypePricing(unitType: UnitType) {
    let billingInterval = 'monthly';

    switch (unitType.billingInterval) {
      case 'day':
        billingInterval = 'daily';
        break;
      case 'week':
        billingInterval = 'weekly';
        break;
      case "year":
        billingInterval = 'yearly';
        break;
      default:
        billingInterval = 'monthly';
        break;
    }

    return `${this.currencyPipe.transform(unitType.price)}, billed ${billingInterval}`;
  }

  private reloadUnitTypes() {
    this.unitTypes = this.unitTypesService.getUnitTypes().pipe(
      tap(response => this.totalUnitTypes = response.meta.totalItems),
      map(response => response.items)
    )
  }
}
