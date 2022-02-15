import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, fromEvent, Observable, Subject, Subscription} from "rxjs";
import {Unit, UnitDataType} from "../../../../../data/types";
import {ChartDataType, UnitIndicatorDataType} from "../../../../../data/enums";
import {ActivatedRoute} from "@angular/router";
import {UnitsService} from "../../../../../api/backend/services/units.service";
import {PageTitleService} from "../../../../../services/page-title.service";
import {distinctUntilChanged, filter, map, takeUntil, tap} from "rxjs/operators";
import {storroAnimations} from "../../../../shared/animations";

@Component({
  selector: 'app-admin-unit',
  templateUrl: './admin-unit.component.html',
  styleUrls: ['./admin-unit.component.scss'],
  animations: storroAnimations
})
export class AdminUnitComponent implements OnDestroy, OnInit {

  unit: Observable<Unit>;

  chartGridCols = 4;
  indicatorCols = 4;
  manageCols = 4;
  unitIndicators: UnitIndicatorDataType[] = [
    UnitIndicatorDataType.HUMIDITY,
    UnitIndicatorDataType.TEMP,
    UnitIndicatorDataType.STATE,
    UnitIndicatorDataType.DOOR,
  ];

  unitCharts: ChartDataType[] = [
    ChartDataType.HUMIDITY,
    ChartDataType.TEMPERATURE
  ];

  unitData: Observable<UnitDataType>;

  private mediaSubscription?: Subscription;
  private destroyed = new Subject<boolean>();
  private _unitData: BehaviorSubject<UnitDataType | null> = new BehaviorSubject<UnitDataType | null>(null);

  constructor(private activatedRoute: ActivatedRoute,
              private unitsService: UnitsService,
              private pageTitleService: PageTitleService) {
    this.unit = this.activatedRoute.data.pipe(
      map(data => data.unit),
      tap(unit => this.pageTitleService.title = unit.name),
      tap(unit => this.unitsService.getUnitData(unit).subscribe(this._unitData)),
      takeUntil(this.destroyed)
    );

    this.unitData = this._unitData.pipe(
      takeUntil(this.destroyed),
      filter(d => !!d),
    ) as Observable<UnitDataType>;
  }

  ngOnInit() {
    this.setSize();
    this.mediaSubscription =   fromEvent(window, 'resize').pipe(
      distinctUntilChanged()
    ).subscribe(() => {
      this.setSize();
    });
  }

  ngOnDestroy() {
    this.destroyed.next(true);
    if (this.mediaSubscription) {
      this.mediaSubscription.unsubscribe();
    }
  }

  getChartURL(chartType: ChartDataType) {
    return `./chart/${chartType.toLowerCase()}`;
  }

  private setSize() {
    if (window.innerWidth < 1500) {
      this.chartGridCols = 2;
      this.indicatorCols = 2;
      this.manageCols = 2;
    } else {
      this.chartGridCols = 4;
      this.indicatorCols = 4;
      this.manageCols = 4;
    }
  }
}
