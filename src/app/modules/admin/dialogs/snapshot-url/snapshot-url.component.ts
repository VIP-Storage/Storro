import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LocalCamera, Unit} from "../../../../data";
import {UnitSnapshotsService} from "../../../../api/backend/services/unit-snapshots.service";
import {UnitsService} from "../../../../api/backend/services/units.service";
import {Observable, tap} from "rxjs";
import {MatTab, MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-snapshot-url',
  templateUrl: './snapshot-url.component.html',
  styleUrls: ['./snapshot-url.component.scss']
})
export class SnapshotUrlComponent {

  @ViewChild('manual') manualTab!: MatTab;
  @ViewChild('automatic') automaticTab!: MatTab;

  rtspPattern = `^(rtsp):\\/\\/([^\\s@/]+)@([^\\s/:]+)(?::([0-9]+))?(\\/.*)`;
  submitted: boolean = false;
  error: string | null = null;
  urlControl: FormControl;
  urlForm: FormGroup;
  usernameControl: FormControl;
  passwordControl: FormControl;
  autoForm: FormGroup;
  selectedCameraAddress: string | null = null;
  generatedCameraURL: string | null = null;
  loadingCameras = true;
  localCameras: Observable<LocalCamera[]>;
  mode: 'AUTOMATIC' | 'MANUAL' = 'AUTOMATIC';

  static panelClass = 'snapshot-url-dialog';

  constructor(@Inject(MAT_DIALOG_DATA) public unit: Unit,
              private unitsService: UnitsService,
              private dialogRef: MatDialogRef<SnapshotUrlComponent>,
              private unitSnapshotsService: UnitSnapshotsService) {
    this.localCameras = this.unitsService.discoverCameras().pipe(
      tap(() => this.loadingCameras = false)
    );

    this.urlControl = new FormControl('', [Validators.required, Validators.pattern(this.rtspPattern)]);
    this.usernameControl = new FormControl('', [Validators.required]);
    this.passwordControl = new FormControl('', [Validators.required]);

    this.urlControl.setValue(unit.rtspSnapshotURL);

    this.urlForm = new FormGroup({
      url: this.urlControl,
    });

    this.autoForm = new FormGroup({
      username: this.usernameControl,
      password: this.passwordControl
    });

    this.updateAutoForm();
  }

  getURLError() {
    if (this.urlControl.hasError('required')) {
      return 'You must enter a remote camera address';
    }

    return this.urlControl.hasError('pattern') ? `Camera address number must be in format 'rtsp://username:password@0.0.0.0/axis-media/media.amp'` : '';
  }

  getPasswordError() {
    if (this.passwordControl.hasError('required')) {
      return 'You must enter a password'
    }

    return '';
  }


  getUsernameError() {
    if (this.usernameControl.hasError('required')) {
      return 'You must enter a username'
    }

    return '';
  }

  get submitDisabled() {
    if (this.mode === 'AUTOMATIC') {
      return this.passwordControl.invalid || this.usernameControl.invalid || !this.selectedCameraAddress || this.submitted;
    }
    return this.urlControl.invalid || this.submitted;
  }

  submit() {
    this.submitted = true;
    this.error = null;

    this.unitSnapshotsService.updateStreamURL(this.unit.id, this.urlControl.value).subscribe(res => {
      if (res.success) {
        this.dialogRef.close();
      } else {
        this.submitted = false;
        this.error = res.message;
      }
    })
  }

  close() {
    this.dialogRef.close();
  }


  handleListClick(address: string) {
    if (this.selectedCameraAddress !== address) {
      this.selectedCameraAddress = address;
      this.updateCameraAddress();
    }
  }

  modeChanged(event: MatTabChangeEvent) {
    if (event.tab === this.automaticTab) {
      this.mode = 'AUTOMATIC';
    } else if (event.tab === this.manualTab) {
      this.mode = 'MANUAL';
    }
  }

  updateCameraAddress() {
    this.generatedCameraURL = `rtsp://${this.usernameControl.value}:${this.passwordControl.value}@${this.selectedCameraAddress}:554/ISAPI/streaming/channels/101`;
  }

  private updateAutoForm() {
    const url = this.unit.rtspSnapshotURL;

    if (!!url && url.includes('rtsp://')) {
      const splitURL = url.replace('rtsp://', '').split(':');
      const username = splitURL[0];
      let remainingURL = splitURL[1].split('@');
      const password = remainingURL[0];
      remainingURL = remainingURL[1].split(':');
      this.selectedCameraAddress = remainingURL[0];
      this.usernameControl.setValue(username);
      this.passwordControl.setValue(password);
      this.generatedCameraURL = url;
    }
  }
}
