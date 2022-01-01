import {AfterViewInit, Component, Input} from '@angular/core';
import {UnitType} from "../../../../../data/types";
import {UnitsService} from "../../../../../api/backend/services/units.service";
import {BehaviorSubject, interval, Subject} from "rxjs";

@Component({
  selector: 'app-unit-snapshot',
  templateUrl: './unit-snapshot.component.html',
  styleUrls: ['./unit-snapshot.component.scss']
})
export class UnitSnapshotComponent implements AfterViewInit {

  @Input()
  set unit(newValue: UnitType | null) {
    if (!!newValue) {
      this._unit = newValue;
      this.updateSnapshot();
    }
  }

  snapshotURL = new BehaviorSubject<string>('');

  private _unit?: UnitType;

  constructor(private unitsService: UnitsService) {
  }

  ngAfterViewInit() {
    interval(10000).subscribe(() => {
      this.updateSnapshot();
    });
  }

  private updateSnapshot() {
    if (!!this._unit) {
      this.snapshotURL.next(this.unitsService.getUnitSnapshotURL(this._unit));
    }
  }

}
