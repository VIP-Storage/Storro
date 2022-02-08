import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MonitorNameValidator} from "../../validators/monitor-name.validator";
import {ZoneminderService} from "../../../../api/backend/services/zoneminder.service";

@Component({
  selector: 'app-monitor-create',
  templateUrl: './monitor-create.component.html',
  styleUrls: ['./monitor-create.component.scss']
})
export class MonitorCreateComponent {

  monitorNamePattern = `^([A-Z]\\d{3}|\\d[A-Z]\\d{2}|\\d{2}[A-Z]\\d|\\d{3}[A-Z])$`;
  monitorName: FormControl = new FormControl('', [Validators.required, Validators.pattern(this.monitorNamePattern)], MonitorNameValidator.createValidator(this.zoneminderService));

  monitorAddressPattern = `^(rtsp):\\/\\/([^\\s@/]+)@([^\\s/:]+)(?::([0-9]+))?(\\/.*)`;
  monitorAddress: FormControl = new FormControl('', [Validators.required, Validators.pattern(this.monitorAddressPattern)]);

  @Input()
  set disabled(disabled: boolean) {
    if (disabled) {
      this.monitorName.disable();
      this.monitorAddress.disable();
    } else {
      this.monitorName.enable();
      this.monitorAddress.enable();
    }
  }

  constructor(private zoneminderService: ZoneminderService) { }


  getMonitorNameErrorMessage() {
    if (this.monitorName.hasError('required')) {
      return 'You must enter a camera name';
    } else if (this.monitorName.hasError('invalidAsync')) {
      return 'This camera or monitor name already exists';
    }

    return this.monitorName.hasError('pattern') ? `Camera name must be in format A123` : '';
  }

  getMonitorAddressErrorMessage() {
    if (this.monitorAddress.hasError('required')) {
      return 'You must enter a remote camera address';
    }

    return this.monitorAddress.hasError('pattern') ? `Camera address number must be in format 'rtsp://username:password@0.0.0.0/axis-media/media.amp'` : '';
  }
}
