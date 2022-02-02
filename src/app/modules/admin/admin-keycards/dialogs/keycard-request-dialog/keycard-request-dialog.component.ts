import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {KeycardRequestState} from "../../../../../data/enums";
import {storroAnimations} from "../../../../shared/animations";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {KeycardRequest} from "../../../../../data/types";
import {KeycardsService} from "../../../../../api/backend/services/keycards.service";
import {Observable} from "rxjs";
import {IResponse} from "../../../../../data/response";

@Component({
  selector: 'app-keycard-request-dialog',
  templateUrl: './keycard-request-dialog.component.html',
  styleUrls: ['./keycard-request-dialog.component.scss'],
  animations: storroAnimations
})
export class KeycardRequestDialogComponent implements OnInit {

  error: string | null = null;
  submitted: boolean = false;
  state: KeycardRequestState = KeycardRequestState.Pending;
  approvalFormGroup: FormGroup;
  denialFormGroup: FormGroup;

  facilityCode = new FormControl('', [Validators.required, Validators.minLength(4)]);
  cardCode = new FormControl('', [Validators.required, Validators.minLength(8)]);
  denialReason = new FormControl('', [Validators.required]);


  static panelClass = 'keycard-request-dialog';

  constructor(@Inject(MAT_DIALOG_DATA) public keycardRequest: KeycardRequest,
              private dialogRef: MatDialogRef<KeycardRequestDialogComponent>,
              private keycardsService: KeycardsService) {
    this.approvalFormGroup = new FormGroup({
      facilityCode: this.facilityCode,
      cardCode: this.cardCode,
    });

    this.denialFormGroup = new FormGroup({
      denialReason: this.denialReason
    });
  }

  ngOnInit(): void {
    this.state = this.keycardRequest.state;
  }

  getErrorMessage(formControl: FormControl, displayLabel?: string) {
    if (!formControl) {
      console.warn(`FormControl '${name}' is null or undefined`);
      return '';
    }

    const label = (displayLabel ? displayLabel : 'value');

    if (formControl.hasError('required')) {
      return `You must enter a ${label}`;
    } else if (formControl.hasError('minlength')) {
      return `'${formControl.value}' is too short of a ${label}`;
    } else if (formControl.hasError('mask')) {
      const requiredValue = formControl.getError('mask').requiredMask;

      return `'${formControl.value}' is not a valid ${label}, must be in format ${requiredValue}`;
    }

    return '';
  }

  save() {
    this.error = null;
    this.submitted = true;
    let observable: Observable<IResponse<KeycardRequest>>;

    if (this.state === KeycardRequestState.Denied) {
      observable = this.keycardsService.denyRequest(this.keycardRequest, this.denialReason.value)
    } else if (this.state === KeycardRequestState.Approved) {
      observable = this.keycardsService.approveRequest(this.keycardRequest, this.cardCode.value, this.facilityCode.value);
    } else {
      return;
    }

    observable.subscribe(response => {
      if (!response.success) {
        this.error = response.message || response.errorMessage;
        this.submitted = false;
      } else {
        this.dialogRef.close(response.data);
      }
    })
  }

  close() {
    this.dialogRef.close(null);
  }

  get saveDisabled() {
    switch (this.state) {
      case KeycardRequestState.Approved:
        return this.cardCode.invalid || this.facilityCode.invalid || this.submitted;
      case KeycardRequestState.Denied:
        return this.denialReason.invalid || this.submitted;
      default:
        return true;
    }
  }
}
