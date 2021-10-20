import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {UnitType} from "../../../../data/types/unit.type";
import {filter, map, tap} from "rxjs/operators";
import {UnitIndicatorDataType} from "../../../../data/enums/unit-indicator.enum";
import {ChartDataType} from "../../../../data/enums/chart-data.enum";
import {UnitDataType} from "../../../../data/types/unit-data.type";
import {UnitsService} from "../../../../api/backend/services/units.service";

@Component({
  selector: 'app-client-unit',
  templateUrl: './client-unit.component.html',
  styleUrls: ['./client-unit.component.scss']
})
export class ClientUnitComponent implements OnInit {


  unit: Observable<UnitType>;

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

  constructor(private activatedRoute: ActivatedRoute,
              private unitsService: UnitsService) {
    this.unit = this.activatedRoute.data.pipe(
      map(data => data.unit),
      tap(unit => this.unitsService.getUnitData(unit).subscribe(this._unitData))
    );

    this.unitData = this._unitData.pipe(filter(d => !!d)) as Observable<UnitDataType>;
  }

  ngOnInit(): void {
  }

}
