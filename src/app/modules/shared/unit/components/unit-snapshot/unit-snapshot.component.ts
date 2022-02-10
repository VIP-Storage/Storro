import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {Unit} from "../../../../../data/types";
import {UnitsService} from "../../../../../api/backend/services/units.service";
import {BehaviorSubject, interval, Subject} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {takeUntil} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-unit-snapshot',
  templateUrl: './unit-snapshot.component.html',
  styleUrls: ['./unit-snapshot.component.scss']
})
export class UnitSnapshotComponent implements AfterViewInit, OnDestroy {

  @Input()
  set unit(newValue: Unit | null) {
    if (!!newValue) {
      this._unit = newValue;
      this.updateSnapshot();
    }
  }

  snapshotURL = new BehaviorSubject<string>('');

  @Input()
  set mode(mode: 'ADMIN' | 'USER') {
    this._mode = mode;
  }

  private _mode: 'ADMIN' | 'USER' = 'USER';
  private destroyed = new Subject<boolean>();
  private _unit?: Unit;

  constructor(private unitsService: UnitsService,
              private router: Router,
              private domSanitizer: DomSanitizer) {
  }

  ngAfterViewInit() {
    interval(10000).pipe(
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.updateSnapshot();
    });
  }

  ngOnDestroy() {
    this.destroyed.next(true);
  }

  private updateSnapshot() {
    if (!!this._unit) {
      this.unitsService.getUnitSnapshotURL(this._unit, this.domSanitizer).subscribe(url => {
        this.snapshotURL.next(url);
      })
    }
  }

  get showSettings() {
    return this._mode === 'ADMIN';
  }

  goToSettings() {
    const rootURL = this.getBackURL(this._unit!);

    return this.router.navigate(['admin', 'unit', this._unit!.id, 'settings', 'monitor'], {
      queryParams: {
        root: rootURL
      }
    });
  }

  getBackURL(unit: Unit) {
    if (this._mode === 'ADMIN') {
      return `/admin/unit/${unit.id}`;
    }

    return null;
  }

  downloadImage(passedURL: any) {
   return this.unitsService.downloadSnapshot(passedURL);
  }
}
