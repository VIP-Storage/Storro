import {AfterViewInit, Component, Input} from '@angular/core';
import {Unit} from "../../../../../data/types";
import {UnitsService} from "../../../../../api/backend/services/units.service";
import {BehaviorSubject, interval, Subject} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-unit-snapshot',
  templateUrl: './unit-snapshot.component.html',
  styleUrls: ['./unit-snapshot.component.scss']
})
export class UnitSnapshotComponent implements AfterViewInit {

  @Input()
  set unit(newValue: Unit | null) {
    if (!!newValue) {
      this._unit = newValue;
      this.updateSnapshot();
    }
  }

  snapshotURL = new BehaviorSubject<string>('');

  private _unit?: Unit;

  constructor(private unitsService: UnitsService,
              private domSanitizer: DomSanitizer) {
  }

  ngAfterViewInit() {
    interval(10000).subscribe(() => {
      this.updateSnapshot();
    });
  }

  private updateSnapshot() {
    if (!!this._unit) {
      this.unitsService.getUnitSnapshotURL(this._unit, this.domSanitizer).subscribe(url => {
        this.snapshotURL.next(url);
      })
    }
  }


}
