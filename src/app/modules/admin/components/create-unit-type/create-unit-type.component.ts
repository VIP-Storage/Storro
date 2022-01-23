import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UnitTypesService} from "../../../../api/backend/services/unit-types.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-unit-type',
  templateUrl: './create-unit-type.component.html',
  styleUrls: ['./create-unit-type.component.scss']
})
export class CreateUnitTypeComponent {


  error: string | null = null;
  unitTypeName: FormControl = new FormControl('', Validators.required)
  unitTypePrice: FormControl = new FormControl('', Validators.required)
  unitTypeDescription: FormControl = new FormControl('')
  unitTypeBillingInterval: FormControl = new FormControl('', Validators.required)
  unitTypeLocation: FormControl = new FormControl({value: 'Cordova', disabled: true}, Validators.required)

  unitTypeForm: FormGroup = new FormGroup({
    unitTypeName: this.unitTypeName,
    unitTypePrice: this.unitTypePrice,
    unitTypeDescription: this.unitTypeDescription,
    unitTypeBillingInterval: this.unitTypeBillingInterval,
    unitTypeLocation: this.unitTypeLocation
  });

  constructor(private matDialogRef: MatDialogRef<CreateUnitTypeComponent>,
              private unitTypesService: UnitTypesService) {
  }


  getUnitTypeNameErrorMessage() {
    if (this.unitTypeName.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  getUnitTypePriceErrorMessage() {
    if (this.unitTypePrice.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }


  createUnitType() {
    this.matDialogRef.close();
  }

  get disableSubmit() {
    return this.unitTypeName.invalid || this.unitTypePrice.invalid;
  }
}
