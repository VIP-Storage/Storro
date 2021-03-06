import {Component, HostBinding, Input} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {filter} from "rxjs/operators";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ToggleOptionType, UnitDataType, Unit} from "../../../../../data/types";
import {ChartDataType, UnitIndicatorDataType} from "../../../../../data/enums";
import {UnitsService} from "../../../../../api/backend/services/units.service";

@Component({
  selector: 'app-unit-preview',
  templateUrl: './unit-preview.component.html',
  styleUrls: ['./unit-preview.component.scss'],
  animations: [
    trigger('chartsTrigger', [
      state('true', style({
        opacity: '1',
        transform: 'translateX(0)'
      })),
      transition('void => *', [style({opacity: '0', transform: 'translateX(-50%)'}), animate('250ms ease-in-out')])
    ]),
    trigger('snapshotTrigger', [
      state('true', style({
        opacity: '1',
        transform: 'translateX(0)'
      })),
      transition('void => *', [style({opacity: '0', transform: 'translateX(50%)'}), animate('250ms ease-in-out')])
    ])
  ]
})
export class UnitPreviewComponent {

  @Input()
  set unit(newValue: Unit|null) {
    if (!!newValue) {
      this._unit = newValue;
      this.unitsService.getUnitData(newValue).subscribe(this._unitData);
    }
  }

  get unit(): Unit {
    return this._unit!;
  }

  @Input()
  @HostBinding('class.mat-elevation-z3')
  showShadow: boolean = true;

  toggleSelected!: ToggleOptionType;
  toggleOptions: ToggleOptionType[] = [
    {
      value: 'charts',
      text: 'Charts',
      icon: 'show_chart'
    },
    {
      value: 'snapshot',
      text: 'Snapshot',
      icon: 'camera'
    }
  ]

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
  private _unit?: Unit

  constructor(private unitsService: UnitsService) {
    this.unitData = this._unitData.pipe(filter(d => !!d)) as Observable<UnitDataType>;
    this.toggleSelected = this.toggleOptions[0];
  }

  get selected() {
    return this.toggleSelected.value;
  }

  getLink(forUnit: Unit): string {
    return `/client/unit/${forUnit.id}`;
  }

  getChartURL(unit: Unit, chartType: ChartDataType) {
    return `../unit/${unit.id}/chart/${chartType.toLowerCase()}`;
  }
}
