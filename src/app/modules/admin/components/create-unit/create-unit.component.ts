import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, of} from "rxjs";
import {UnitType} from "../../../../data/types";
import {CurrencyPipe} from "@angular/common";
import {UnitsService} from "../../../../api/backend/services/units.service";
import {UnitTypesService} from "../../../../api/backend/services/unit-types.service";
import {UnitNumberValidator} from "../../validators/unit-number.validator";
import {catchError, map} from "rxjs/operators";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-unit',
  templateUrl: './create-unit.component.html',
  styleUrls: ['./create-unit.component.scss']
})
export class CreateUnitComponent {

  unitNumberPattern = `^([A-Z]\\d{3}|\\d[A-Z]\\d{2}|\\d{2}[A-Z]\\d|\\d{3}[A-Z])$`;
  standardValidators = [Validators.required, Validators.pattern(this.unitNumberPattern)]

  submitted: boolean = false;
  error: string | null = null;
  unitNumber: FormControl;
  unitType: FormControl;
  unitLocation: FormControl;
  unitForm: FormGroup;
  unitTypes: Observable<UnitType[]>

  private currencyPipe: CurrencyPipe = new CurrencyPipe('en');

  constructor(private unitsService: UnitsService,
              private unitTypesService: UnitTypesService,
              private matDialogRef: MatDialogRef<CreateUnitComponent>) {
    this.unitNumber = new FormControl('', this.standardValidators, UnitNumberValidator.createValidator(this.unitsService));
    this.unitType = new FormControl('', Validators.required);
    this.unitLocation = new FormControl({value: 'Cordova', disabled: true}, Validators.required)

    this.unitForm = new FormGroup({
      unitNumber: this.unitNumber,
      unitType: this.unitType,
      unitLocation: this.unitLocation
    });

    this.unitTypes = this.unitTypesService.getUnitTypes().pipe(
      map(res => res.items)
    );
  }

  getUnitTypeDisplayName(unitType: UnitType) {
    let billingInterval = 'month';

    if (unitType.billingInterval.includes('week')) {
      billingInterval = 'week'
    } else if (unitType.billingInterval.includes('year')) {
      billingInterval = 'year';
    }

    return `${unitType.name} - ${this.currencyPipe.transform(unitType.price)}/${billingInterval}`;
  }

  getUnitNumberErrorMessage() {
    if (this.unitNumber.hasError('required')) {
      return 'You must enter a value';
    } else if (this.unitNumber.hasError('invalidAsync')) {
      return 'This unit already exists';
    }

    return this.unitNumber.hasError('pattern') ? `Unit number must be in format A123` : '';
  }

  get disableSubmit() {
    return this.unitForm.invalid || this.submitted;
  }

  createUnit() {
    const unitType: UnitType = this.unitType.value;

    this.submitted = true;
    this.unitsService.createUnit(
      this.unitNumber.value,
      this.unitLocation.value,
      unitType.id,
      unitType.name
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
}
