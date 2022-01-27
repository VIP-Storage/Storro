import {Component} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Unit, UnitDataType} from "../../../../../data/types";
import {ChartDataType, UnitIndicatorDataType} from "../../../../../data/enums";
import {ActivatedRoute} from "@angular/router";
import {UnitsService} from "../../../../../api/backend/services/units.service";
import {PageTitleService} from "../../../../../services/page-title.service";
import {filter, map, tap} from "rxjs/operators";
import {storroAnimations} from "../../../animations";

@Component({
  selector: 'app-unit-overview',
  templateUrl: './unit-overview.component.html',
  styleUrls: ['./unit-overview.component.scss'],
  animations: storroAnimations
})
export class UnitOverviewComponent {

  unit: Observable<Unit>;

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

  private _mode: 'ADMIN' | 'USER' = 'USER';
  private _unitData: BehaviorSubject<UnitDataType | null> = new BehaviorSubject<UnitDataType | null>(null);

  constructor(private activatedRoute: ActivatedRoute,
              private unitsService: UnitsService,
              private pageTitleService: PageTitleService) {
    this.unit = this.activatedRoute.data.pipe(
      tap(data => {
        if (data.mode) {
          this._mode = data.mode;
        }
      }),
      map(data => data.unit),
      tap(unit => this.pageTitleService.title = unit.name),
      tap(unit => this.unitsService.getUnitData(unit).subscribe(this._unitData)),
    );

    this.unitData = this._unitData.pipe(filter(d => !!d)) as Observable<UnitDataType>;
  }

  getChartURL(chartType: ChartDataType) {
    return `./chart/${chartType.toLowerCase()}`;
  }

  get backURL() {
    return this._mode === 'ADMIN' ? '/admin/units' : '/client/dashboard';
  }
}
