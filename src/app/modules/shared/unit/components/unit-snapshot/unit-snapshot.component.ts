import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {Unit} from "../../../../../data";
import {BehaviorSubject, interval, Subject, take} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {takeUntil} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {SnapshotUrlComponent} from "../../../../admin/dialogs/snapshot-url/snapshot-url.component";
import {UnitSnapshotsService} from "../../../../../api/backend/services/unit-snapshots.service";

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

  imageLoaded: boolean = false;
  snapshotURL = new BehaviorSubject<string>('');

  @Input()
  set mode(mode: 'ADMIN' | 'USER') {
    this._mode = mode;
  }

  private _mode: 'ADMIN' | 'USER' = 'USER';
  private destroyed = new Subject<boolean>();
  private _unit?: Unit;

  constructor(private unitSnapshotsService: UnitSnapshotsService,
              private matDialog: MatDialog,
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
      this.unitSnapshotsService.getUnitSnapshotURL(this._unit, this.domSanitizer).subscribe(url => {
        this.snapshotURL.next(url);
      })
    }
  }

  get showSettings() {
    return this._mode === 'ADMIN';
  }

  goToSettings() {
    this.matDialog.open(SnapshotUrlComponent, {
      panelClass: SnapshotUrlComponent.panelClass,
      data: this._unit
    });
  }


  downloadImage() {
    if (!!this._unit) {
      return this.unitSnapshotsService.saveSnapshot(this._unit.id).pipe(
        take(1),
      ).subscribe();
    }

    return null;
  }

  didLoad() {
    this.imageLoaded = true;
  }
}
