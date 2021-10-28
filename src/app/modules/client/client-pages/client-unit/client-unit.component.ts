import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {filter, map, tap} from "rxjs/operators";
import {UnitsService} from "../../../../api/backend/services/units.service";
import {ChartDataType, UnitIndicatorDataType} from "../../../../data/enums";
import {UnitDataType, UnitType} from "../../../../data/types";
import {storroAnimations} from "../../../shared/animations";
import {PageTitleService} from "../../../../services/page-title.service";

@Component({
  selector: 'app-client-unit',
  templateUrl: './client-unit.component.html',
  styleUrls: ['./client-unit.component.scss'],
  animations: storroAnimations
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
              private unitsService: UnitsService,
              private pageTitleService: PageTitleService) {
    this.unit = this.activatedRoute.data.pipe(
      map(data => data.unit),
      tap(unit => this.pageTitleService.title = unit.name),
      tap(unit => this.unitsService.getUnitData(unit).subscribe(this._unitData)),
    );

    this.unitData = this._unitData.pipe(filter(d => !!d)) as Observable<UnitDataType>;
  }

  ngOnInit(): void {
  }

}
