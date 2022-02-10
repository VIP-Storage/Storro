import {Component, Input} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MonitorNameValidator} from "../../validators/monitor-name.validator";
import {ZoneminderService} from "../../../../api/backend/services/zoneminder.service";
import {Unit} from "../../../../data/types";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-monitor-create',
  templateUrl: './monitor-create.component.html',
  styleUrls: ['./monitor-create.component.scss']
})
export class MonitorCreateComponent {

  error: string | null = null;
  submitted: boolean = false;
  monitorNamePattern = `^([A-Z]\\d{3}|\\d[A-Z]\\d{2}|\\d{2}[A-Z]\\d|\\d{3}[A-Z])$`;
  monitorName: FormControl = new FormControl('', [Validators.required, Validators.pattern(this.monitorNamePattern)], MonitorNameValidator.createValidator(this.zoneminderService));

  monitorAddressPattern = `^(rtsp):\\/\\/([^\\s@/]+)@([^\\s/:]+)(?::([0-9]+))?(\\/.*)`;
  monitorAddress: FormControl = new FormControl('', [Validators.required, Validators.pattern(this.monitorAddressPattern)]);


  @Input()
  set unit(unit: Unit | null) {
    this.currentUnit = unit || undefined;

    if (!!unit) {
      this.monitorName.setValue(unit.id);
      this.monitorName.disable();
    } else {
      this.monitorName.setValue(null);
      this.monitorName.enable();
    }
  }

  currentUnit?: Unit;

  constructor(private zoneminderService: ZoneminderService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

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

  get disableSubmit() {
    return this.monitorName.invalid || this.monitorAddress.invalid || this.submitted;
  }

  createMonitor() {
    this.submitted = true;
    this.error = null;

    this.zoneminderService.createMonitor(this.monitorName.value, this.monitorAddress.value, this.currentUnit!.id).subscribe(res => {
      if (res.success) {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute}).then();
      } else {
        this.submitted = false;
        this.error = res.message;
      }
    })
  }
}
