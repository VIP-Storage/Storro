import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {UnitsService} from "../../../api/backend/services/units.service";

export class UnitNumberValidator {
  static createValidator(unitsService: UnitsService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      const unitNumber: string = `${control.value}`;

      if (unitNumber.length === 4) {
        return unitsService.unitExists(unitNumber).pipe(
          map(unitExists => unitExists ? {invalidAsync: true} : {})
        )
      }

      return of({})
    };
  }
}
