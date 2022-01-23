import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {UnitType} from "../../../../data/types";
import {CurrencyPipe} from "@angular/common";
import {UnitsService} from "../../../../api/backend/services/units.service";
import {UnitTypesService} from "../../../../api/backend/services/unit-types.service";
import {UnitNumberValidator} from "../../validators/unit-number.validator";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-create-unit',
  templateUrl: './create-unit.component.html',
  styleUrls: ['./create-unit.component.scss']
})
export class CreateUnitComponent {

  unitNumberPattern = `^([A-Z]\\d{3}|\\d[A-Z]\\d{2}|\\d{2}[A-Z]\\d|\\d{3}[A-Z])$`;
  standardValidators = [Validators.required, Validators.pattern(this.unitNumberPattern)]

  error: string | null = null;
  unitNumber: FormControl;
  unitType: FormControl;
  unitForm: FormGroup;
  unitTypes: Observable<UnitType[]>

  private currencyPipe: CurrencyPipe = new CurrencyPipe('en');

  constructor(private unitsService: UnitsService,
              private unitTypesService: UnitTypesService) {
    this.unitNumber = new FormControl('', this.standardValidators, UnitNumberValidator.createValidator(this.unitsService));
    this.unitType = new FormControl('', Validators.required);

    this.unitForm = new FormGroup({
      unitNumber: this.unitNumber,
      unitType: this.unitType
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
    }

    return this.unitNumber.hasError('pattern') ? `Unit number must be in format A123` : '';
  }


  createUnit() {

  }
}
