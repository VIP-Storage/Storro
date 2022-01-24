import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {UnitTypesService} from "../../../api/backend/services/unit-types.service";

export class UnitTypeNameValidator {
  static createValidator(unitTypesService: UnitTypesService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      const unitTypeName: string = `${control.value}`;

      if (unitTypeName.length > 0) {
        return unitTypesService.unitTypeExists(unitTypeName).pipe(
          map(unitExists => unitExists ? {invalidAsync: true} : {})
        )
      }

      return of({})
    };
  }
}
