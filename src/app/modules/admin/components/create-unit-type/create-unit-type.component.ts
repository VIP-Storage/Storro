import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UnitTypesService} from "../../../../api/backend/services/unit-types.service";
import {MatDialogRef} from "@angular/material/dialog";
import {UnitTypeNameValidator} from "../../validators/unit-type-name.validator";
import {UnitPriceValidator} from "../../validators/unit-price.validator";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-create-unit-type',
  templateUrl: './create-unit-type.component.html',
  styleUrls: ['./create-unit-type.component.scss']
})
export class CreateUnitTypeComponent {


  submitted: boolean = false;
  error: string | null = null;
  unitTypeName: FormControl;
  unitTypePrice: FormControl;
  unitTypeDescription: FormControl;
  unitTypeBillingInterval: FormControl;
  unitTypeLocation: FormControl;

  unitTypeForm: FormGroup;

  constructor(private matDialogRef: MatDialogRef<CreateUnitTypeComponent>,
              private unitTypesService: UnitTypesService) {

    this.unitTypeName = new FormControl('', {
      updateOn: 'blur',
      validators: Validators.required,
      asyncValidators: UnitTypeNameValidator.createValidator(this.unitTypesService)
    })
    this.unitTypePrice = new FormControl('', [UnitPriceValidator.min, Validators.required])
    this.unitTypeDescription = new FormControl('')
    this.unitTypeBillingInterval = new FormControl('', Validators.required)
    this.unitTypeLocation = new FormControl({value: 'Cordova', disabled: true}, Validators.required)

    this.unitTypeForm = new FormGroup({
      unitTypeName: this.unitTypeName,
      unitTypePrice: this.unitTypePrice,
      unitTypeDescription: this.unitTypeDescription,
      unitTypeBillingInterval: this.unitTypeBillingInterval,
      unitTypeLocation: this.unitTypeLocation
    });
  }


  getUnitTypeNameErrorMessage() {
    if (this.unitTypeName.hasError('required')) {
      return 'You must enter a value';
    }

    return this.unitTypeName.hasError('invalidAsync') ? 'This unit type already exists' : '';
  }

  getUnitTypePriceErrorMessage() {
    if (this.unitTypePrice.hasError('required')) {
      return 'You must enter a value';
    } else if (this.unitTypePrice.hasError('invalidPrice')) {
      return `'${this.unitTypePrice.getError('invalidPrice').value}' is an invalid price`;
    } else if (this.unitTypePrice.hasError('priceTooLow')) {
      return `'${this.unitTypePrice.getError('priceTooLow').value}' is too low of a price`;
    }

    return '';
  }


  createUnitType() {
    const price = this.unitTypePrice.value * 100;

    this.submitted = true;

    this.unitTypesService.createUnitType(
      this.unitTypeName.value,
      price,
      this.unitTypeDescription.value,
      this.unitTypeLocation.value,
      this.unitTypeBillingInterval.value,
    ).pipe(
      catchError(err => {
        this.error = err;
        this.submitted = false;

        return of(null);
      })
    ).subscribe(res => {
      if (!!res) {
        this.matDialogRef.close(res);
      }
    })
  }

  get disableSubmit() {
    return this.unitTypeName.invalid || this.unitTypePrice.invalid || this.submitted;
  }
}
