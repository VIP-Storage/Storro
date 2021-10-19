import {Component, Input, OnInit} from '@angular/core';
import {UnitType} from "../../../../data/types/unit.type";
import {BehaviorSubject, Observable} from "rxjs";
import {UnitDataType} from "../../../../data/types/unit-data.type";
import {UnitsService} from "../../../../api/backend/services/units.service";
import {filter} from "rxjs/operators";
import {UnitIndicatorDataType} from "../../../../data/enums/unit-indicator.enum";

@Component({
  selector: 'app-unit-preview',
  templateUrl: './unit-preview.component.html',
  styleUrls: ['./unit-preview.component.scss']
})
export class UnitPreviewComponent implements OnInit {

  @Input()
  set unit(newValue: UnitType) {
    this._unit = newValue;
    this.unitsService.getUnitData(newValue).subscribe(this._unitData);
  }

  get unit(): UnitType {
    return this._unit!;
  }

  unitIndicators: Array<UnitIndicatorDataType> = [
    UnitIndicatorDataType.DOOR,
    UnitIndicatorDataType.HUMIDITY,
    UnitIndicatorDataType.STATE,
    UnitIndicatorDataType.TEMP
  ];

  unitData: Observable<UnitDataType>;

  private _unitData: BehaviorSubject<UnitDataType | null> = new BehaviorSubject<UnitDataType | null>(null);
  private _unit?: UnitType

  constructor(private unitsService: UnitsService) {
    this.unitData = this._unitData.pipe(filter(d => !!d)) as Observable<UnitDataType>
  }

  ngOnInit(): void {
  }
}
