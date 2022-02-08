import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ZoneminderService} from "../../../api/backend/services/zoneminder.service";

export class MonitorNameValidator {
  static createValidator(zoneminderService: ZoneminderService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      const monitorName: string = `${control.value}`;

      if (monitorName.length === 4) {
        return zoneminderService.getMonitor(monitorName).pipe(
          catchError(() => of(false)),
          map(exists => !!exists ? {invalidAsync: true} : {})
        )
      }

      return of({})
    };
  }
}
