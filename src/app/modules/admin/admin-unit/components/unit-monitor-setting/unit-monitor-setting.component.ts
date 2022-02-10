import {Component, HostBinding, Input} from '@angular/core';
import {Unit} from "../../../../../data/types";

@Component({
  selector: 'app-unit-monitor-setting',
  templateUrl: './unit-monitor-setting.component.html',
  styleUrls: ['./unit-monitor-setting.component.scss']
})
export class UnitMonitorSettingComponent {

  @Input()
  unit!: Unit;


  @HostBinding('class.error') get configError() {
    return !this.unit.zoneMinderMonitor;
  }


  get stateText() {
    return this.unit.zoneMinderMonitor ? `Configured - ${this.unit.zoneMinderMonitor}` : 'Not Configured';
  }

  get stateIconClass() {
    return !!this.unit.zoneMinderMonitor ? 'success' : 'error';
  }
}
