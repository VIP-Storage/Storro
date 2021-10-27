import {Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BehaviorSubject, ReplaySubject} from "rxjs";
import {filter, map, tap} from "rxjs/operators";
import {MatRipple} from "@angular/material/core";
import {getIconColor} from "../../../helpers/colors.helper";
import {BadgeType, UnitDataType, UnitIndicatorType} from "../../../../../data/types";
import {UnitIndicatorFactory} from "../../../factory/unit-indicator.factory";
import {DoorState, UnitIndicatorDataType, UnitState} from "../../../../../data/enums";

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


  private _indicatorType!: UnitIndicatorDataType;
  private _currentData!: UnitDataType;

  constructor() {
  }


  ngOnInit(): void {
    this.data.pipe(
      filter(d => !!d),
      tap(currentData => this._currentData = currentData),
      map(rawData => {
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
      this.icon = unitIndicatorData.icon;
      this.iconColorStyle = `color: ${getIconColor(unitIndicatorData.iconColor)};`;
      this.text = unitIndicatorData.text;
      this.badge = unitIndicatorData.badge;

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
}
