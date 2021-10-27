import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {UnitType} from "../../../../data/types/unit.type";
import {BehaviorSubject, Observable} from "rxjs";
import {UnitDataType} from "../../../../data/types/unit-data.type";
import {UnitsService} from "../../../../api/backend/services/units.service";
import {filter} from "rxjs/operators";
import {UnitIndicatorDataType} from "../../../../data/enums/unit-indicator.enum";
import {ChartDataType} from "../../../../data/enums/chart-data.enum";

@Component({
  selector: 'app-unit-preview',
  templateUrl: './unit-preview.component.html',
  styleUrls: ['./unit-preview.component.scss']
})
export class UnitPreviewComponent implements OnInit {

  @Input()
  set unit(newValue: UnitType|null) {
    if (!!newValue) {
      this._unit = newValue;
      this.unitsService.getUnitData(newValue).subscribe(this._unitData);
    }
  }

  get unit(): UnitType {
    return this._unit!;
  }

  @Input()
  @HostBinding('class.mat-elevation-z3')
  showShadow: boolean = true;

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

  private _unitData: BehaviorSubject<UnitDataType | null> = new BehaviorSubject<UnitDataType | null>(null);
  private _unit?: UnitType

  constructor(private unitsService: UnitsService) {
    this.unitData = this._unitData.pipe(filter(d => !!d)) as Observable<UnitDataType>;
  }

  ngOnInit(): void {
  }
}
