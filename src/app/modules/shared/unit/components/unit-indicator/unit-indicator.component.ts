import {Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, Subscription} from "rxjs";
import {filter, map, tap} from "rxjs/operators";
import {MatRipple} from "@angular/material/core";
import {getIconColor} from "../../../helpers/colors.helper";
import {BadgeType, UnitDataType, UnitIndicatorType} from "../../../../../data/types";
import {UnitIndicatorFactory} from "../../../factory/unit-indicator.factory";
import {DoorState, UnitIndicatorDataType, UnitState} from "../../../../../data/enums";
import {SensorsService} from "../../../../../api/backend/services/sensors.service";

@Component({
  selector: 'app-unit-indicator',
  templateUrl: './unit-indicator.component.html',
  styleUrls: ['./unit-indicator.component.scss']
})
export class UnitIndicatorComponent implements OnInit {

  showIcons = true;

  @ViewChild(MatRipple) ripple!: MatRipple;

  @HostListener('click', ['$event']) indicatorClicked = (e: { x: number, y: number }) => {
    if (this.clickable) {
      this.ripple.launch(e.x, e.y);
      this.updateUnitData();
    }
  }

  @HostBinding('class.clickable') clickable = false;

  @Output() updated: EventEmitter<UnitDataType> = new EventEmitter<UnitDataType>(true);

  @Input()
  set unitData(newValue: UnitDataType | null) {
    if (!!newValue) {
      this.data.next(newValue);
    }
  }

  @Input()
  set type(newValue: UnitIndicatorDataType) {
    this._indicatorType = newValue;
    this.title = newValue.toString().toLowerCase();
  }

  title?: string;
  icon?: string;
  iconColorStyle?: string;
  text?: string;
  badge?: BadgeType;

  data: ReplaySubject<UnitDataType> = new ReplaySubject<UnitDataType>();
  hasLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  private _liveSub?: Subscription;
  private _indicatorType!: UnitIndicatorDataType;
  private _currentData!: UnitDataType;

  constructor(private sensorsService: SensorsService) {
  }


  ngOnInit(): void {
    this.data.pipe(
      filter(d => !!d),
      tap(currentData => this._currentData = currentData),
      map(rawData => {
        this.attachLiveData(this._indicatorType, rawData.unit);

        switch (this._indicatorType) {
          case UnitIndicatorDataType.DOOR:
            this.clickable = true;
            return UnitIndicatorFactory.getDoorStateData(rawData!.doorState)
          case UnitIndicatorDataType.HUMIDITY:
            return UnitIndicatorFactory.getHumidityData(rawData!.lastHumidity)
          case UnitIndicatorDataType.TEMP:
            return UnitIndicatorFactory.getTemperatureData(rawData!.lastTemperature)
          case UnitIndicatorDataType.STATE:
            this.clickable = true;
            return UnitIndicatorFactory.getUnitStateData(rawData!.state)
        }
      })
    ).subscribe(unitIndicatorData => {
      this.update(unitIndicatorData);
      this.hasLoaded.next(true);
    })
  }

  dataHasBadge(unitIndicatorData: UnitIndicatorType) {
    return !!unitIndicatorData.badge && unitIndicatorData.badge.hasOwnProperty('icon');
  }

  private updateUnitData() {
    switch (this._indicatorType) {
      case UnitIndicatorDataType.DOOR:
        this.updateDoorState();
        break
      case UnitIndicatorDataType.STATE:
        this.updateState();
        break;
      default:
        break
    }

    this.data.next(this._currentData);
    this.updated.emit(this._currentData);
  }

  private updateDoorState() {
    this._currentData.doorState = (this._currentData.doorState === DoorState.OPEN) ? DoorState.CLOSED : DoorState.OPEN;
  }

  private updateState() {
    switch (this._currentData.state) {
      case UnitState.UNLOCKED:
      case UnitState.ALARM:
        this._currentData.state = UnitState.LOCKED;
        break;
      case UnitState.LOCKED:
        this._currentData.state = UnitState.UNLOCKED;
        break;
    }
  }

  private update(data: UnitIndicatorType) {
    this.icon = data.icon;
    this.iconColorStyle = `color: ${getIconColor(data.iconColor)};`;
    this.text = data.text;
    this.badge = data.badge;
  }

  private attachLiveData(type: UnitIndicatorDataType, unit: string) {
    let observable: Observable<any> | null = null;

    switch (type) {
      case UnitIndicatorDataType.TEMP:
        observable = this.sensorsService.getLiveTemperatureChartData(unit).pipe(
          filter(v => !!v),
          map(raw => UnitIndicatorFactory.getTemperatureData(raw as number))
        );
        break;
      case UnitIndicatorDataType.HUMIDITY:
        observable = this.sensorsService.getLiveHumidityChartData(unit).pipe(
          filter(v => !!v),
          map(raw => UnitIndicatorFactory.getHumidityData(raw as number))
        );
        break;
      case UnitIndicatorDataType.DOOR:
        observable = this.sensorsService.getLiveDoorState(unit).pipe(
          filter(v => !!v),
          map(raw => UnitIndicatorFactory.getDoorStateData(raw))
        );
        break;
    }

    if (!!observable) {
      this._liveSub = observable.subscribe(data => {
        this.update(data);
      });
    }
  }
}
