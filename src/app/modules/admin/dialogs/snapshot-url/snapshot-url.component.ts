import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UnitsService} from "../../../../api/backend/services/units.service";
import {Unit} from "../../../../data";

@Component({
  selector: 'app-snapshot-url',
  templateUrl: './snapshot-url.component.html',
  styleUrls: ['./snapshot-url.component.scss']
})
export class SnapshotUrlComponent {

  rtspPattern = `^(rtsp):\\/\\/([^\\s@/]+)@([^\\s/:]+)(?::([0-9]+))?(\\/.*)`;
  submitted: boolean = false;
  error: string | null = null;
  urlControl: FormControl;
  urlForm: FormGroup;

  static panelClass = 'snapshot-url-dialog';

  constructor(@Inject(MAT_DIALOG_DATA) public unit: Unit,
              private dialogRef: MatDialogRef<SnapshotUrlComponent>,
              private unitService: UnitsService) {
    this.urlControl = new FormControl('', [Validators.required, Validators.pattern(this.rtspPattern)]);

    this.urlControl.setValue(unit.rtspSnapshotURL);

    this.urlForm = new FormGroup({
      url: this.urlControl,
    });
  }

  getURLError() {
    if (this.urlControl.hasError('required')) {
      return 'You must enter a remote camera address';
    }

    return this.urlControl.hasError('pattern') ? `Camera address number must be in format 'rtsp://username:password@0.0.0.0/axis-media/media.amp'` : '';
  }

  get hasChanged() {
    return this.urlControl.value !== this.unit.rtspSnapshotURL;
  }

  get disableSubmit() {
    return this.urlControl.invalid || this.submitted;
  }

  submit() {
    this.submitted = true;
    this.error = null;

    this.unitService.updateStreamURL(this.unit.id, this.urlControl.value).subscribe(res => {
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
}
