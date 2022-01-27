import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Unit, UnitType} from "../../../../data/types";
import {BehaviorSubject, merge, Observable, of, Subject} from "rxjs";
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from "rxjs/operators";
import {UnitsService} from "../../../../api/backend/services/units.service";
import {SimpleTableEvent} from "../../../shared/components/simple-table/simple-table.event";
import {PageTitleService} from "../../../../services/page-title.service";
import {MatPaginator} from "@angular/material/paginator";
import {UnitTypesService} from "../../../../api/backend/services/unit-types.service";
import {CurrencyPipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {CreateUnitComponent} from "../../dialogs/create-unit/create-unit.component";
import {CreateUnitTypeComponent} from "../../dialogs/create-unit-type/create-unit-type.component";
import {storroAnimations} from "../../../shared/animations";
import {DebugDialogService} from "../../../../services/debug-dialog.service";
import {PageHeaderAction} from "../../../shared/components/page-header/page-header.action";
import {StatusBadge} from "../../../shared/components/status-badge/status-badge.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-units',
  templateUrl: './admin-units.component.html',
  styleUrls: ['./admin-units.component.scss'],
  animations: storroAnimations
})
export class AdminUnitsComponent implements AfterViewInit {
  displayedColumns: { name: string; title: string }[] = [
    {
      name: 'id',
      title: 'Unit ID'
    },
    {
      name: 'available',
      title: 'Available'
    },
    {
      name: 'unitTypeName',
      title: 'Type'
    },
  ];

  statusBadgeValues: StatusBadge[] =  [
    {
      value: true,
      display: 'Available',
      color: 'success'
    },
    {
      value: false,
      display: 'Unavailable',
      color: 'error'
    }
  ];

  unitTypes: UnitType[] = [];
  units: Unit[] = [];
  pageHeaderActions: PageHeaderAction[] = [
    {
      title: 'Add Unit',
      icon: 'add',
      clickAction: () => {
        this.openCreateUnitDialog();
      }
    },
    {
      title: 'Map View',
      icon: 'map',
      color: 'accent',
      routerLink: './map'
    },
    {
      title: 'Import Units',
      icon: 'download',
      color: 'warn',
      routerLink: './import'
    }
  ]

  pageIndex: number = 1;
  pageSize: number = 25;
  totalUnits = 0;
  totalUnitTypes = 0;
  isLoadingUnits = true;
  isLoadingUnitTypes = true;
  didError = false;
  searchValue: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);
  searchValueChanged: Observable<string|null>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private currencyPipe: CurrencyPipe = new CurrencyPipe('en');
  private tableChange: Subject<SimpleTableEvent> = new Subject<SimpleTableEvent>();
  private lastTableEvent: SimpleTableEvent|undefined;

  constructor(private unitsService: UnitsService,
              private unitTypesService: UnitTypesService,
              private pageTitleService: PageTitleService,
              private debugDialogService: DebugDialogService,
              private matDialog: MatDialog,
              private router: Router) {
    this.pageTitleService.title = 'Units';
    this.reloadUnitTypes();

    this.searchValueChanged = this.searchValue.asObservable().pipe(
      debounceTime(150),
      distinctUntilChanged()
    );
  }

  goToUnit(unit: Unit) {
    this.router.navigate(['admin', 'units', unit.id]).then();
  }

  openCreateUnitDialog() {
    this.matDialog.open(CreateUnitComponent, {
      panelClass: 'create-unit-dialog'
    }).afterClosed().subscribe((res: Unit|null) => {
      if (!!res) {
        this.units.push(res);
        this.totalUnits += 1;
      }
    })
  }

  openCreateUnitTypeDialog() {
    this.matDialog.open(CreateUnitTypeComponent, {
      panelClass: 'create-unit-type-dialog'
    }).afterClosed().subscribe((res: UnitType | null) => {
      if (!!res) {
        this.unitTypes.push(res);
        this.totalUnitTypes += 1;
      }
    })
  }

  openUnitDebugDialog(unit: Unit) {
    this.debugDialogService.openDebugDialog(unit.id, unit);
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

  ngAfterViewInit() {
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

          this.isLoadingUnits = true;
          return this.unitsService.getUnits(pageNumber, pageSize, sortDirection, sortBy, this.searchValue.value).pipe(
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
      .subscribe(data => (this.units = data));
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

  unitTypeSelected(unitType: UnitType) {
    this.debugDialogService.openDebugDialog(unitType.name, unitType);
  }

  private reloadUnitTypes() {
    this.isLoadingUnitTypes = true;
    this.unitTypesService.getUnitTypes().pipe(
      tap(response => this.totalUnitTypes = response.meta.totalItems),
      map(response => response.items)
    ).subscribe(unitTypes => {
      this.unitTypes = unitTypes;
      this.isLoadingUnitTypes = false;
    });
  }
}
