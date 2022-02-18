import {Component, Input, OnInit} from '@angular/core';
import {ZoneminderService} from "../../../../api/backend/services/zoneminder.service";
import {Observable} from "rxjs";
import {Monitor, MonitorListing} from "../../../../data/types/zoneminder";
import {map} from "rxjs/operators";
import {Unit} from "../../../../data/types";

@Component({
  selector: 'app-monitor-list',
  templateUrl: './monitor-list.component.html',
  styleUrls: ['./monitor-list.component.scss']
})
export class MonitorListComponent implements OnInit {

  @Input()
  set unit(unit: Unit|null) {
    if (!!unit) {
      this._unit = unit;
      this._currentMonitorID = unit.zoneMinderMonitor;
    }

  }

  @Input()
  set monitorID(newValue: string|null) {
    if (!!newValue && newValue.length === 4) {
      this._currentMonitorID = newValue;
    }
  }

  monitors!: Observable<MonitorListing[]>

  private _currentMonitorID?: string|null = null;
  private _unit?: Unit;

  constructor(private zoneminderService: ZoneminderService) {
    this.fetchMonitors();
  }

  ngOnInit(): void {
  }

  private fetchMonitors() {
    this.monitors = this.zoneminderService.getMonitors().pipe(
      map(response => response.monitors)
    )
  }

  get currentMonitorID(): string|null {
    return this._currentMonitorID || null;
  }

  set currentMonitorID(newValue: string|null) {
    this._currentMonitorID = newValue;
    console.log(newValue);
  }
}