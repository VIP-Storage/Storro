import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Keycard} from "../../../../data/types";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../api/backend/services/user.service";
import {Observable} from "rxjs";
import {Role} from "../../../../data/enums";
import {KeycardsService} from "../../../../api/backend/services/keycards.service";

@Component({
  selector: 'app-key-card-dialog',
  templateUrl: './key-card-dialog.component.html',
  styleUrls: ['./key-card-dialog.component.scss']
})
export class KeyCardDialogComponent {

  static panelClass = 'key-card-dialog';

  editMode: boolean = false;
  submitted: boolean = false;
  error: string | null = null;
  keyCardInfoFormGroup: FormGroup;

  // keyCardInfoFormGroup
  facilityCode = new FormControl('', [Validators.required, Validators.minLength(4)]);
  cardCode = new FormControl('', [Validators.required, Validators.minLength(8)]);
  cardName = new FormControl('',);

  currentRole: Observable<Role>;

  constructor(@Inject(MAT_DIALOG_DATA) public keyCard: Keycard,
              private userService: UserService,
              private keycardsService: KeycardsService,
              private matDialogRef: MatDialogRef<KeyCardDialogComponent>) {

    this.currentRole = this.userService.currentRole;

    this.keyCardInfoFormGroup = new FormGroup({
      facilityCode: this.facilityCode,
      cardCode: this.cardCode,
      cardName: this.cardName
    });

    this.updateEditMode(false);
  }

  updateEditMode(isEditing: boolean = false) {
    if (isEditing) {
      this.keyCardInfoFormGroup.enable();
    } else {
      this.updateValues(this.keyCard);
      this.keyCardInfoFormGroup.disable();
    }

    this.editMode = isEditing;
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

  doneClicked() {
    if (this.editMode) {
      this.update();
    } else {
      this.matDialogRef.close(null);
    }
  }

  showField(role: Role|null) {
    return role !== Role.Tenant
  }

  get saveDisabled() {
    return this.editMode ?
      this.cardCode.invalid || this.facilityCode.invalid || this.submitted : false;
  }

  get cancelDisabled() {
    return this.editMode ? this.submitted : false;
  }

  get ownerFullName() {
    return `${this.keyCard.owner.firstName} ${this.keyCard.owner.lastName}`
  }

  private update() {
    this.submitted = true;

    this.keycardsService.updateKeyCard(this.keyCard.id, this.cardName.value, this.cardCode.value, this.facilityCode.value).subscribe(res => {
      if (!res.success) {
        this.error = res.error;
        this.submitted = false;
      } else {
        this.matDialogRef.close(res.data);
      }
    })
  }

  private updateValues(keyCard: Keycard) {
    this.cardCode.setValue(keyCard.cardCode);
    this.facilityCode.setValue(keyCard.facilityCode);
    this.cardName.setValue(keyCard.name || 'None');
  }
}
