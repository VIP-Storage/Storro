import {AbstractControl, ValidationErrors} from '@angular/forms';

export class UnitPriceValidator {
  static min(control: AbstractControl): ValidationErrors | null {
    if (`${control.value}`.length > 0) {
      const min = 10;
      const current = Number.parseInt(control.value);

      if (Number.isNaN(current)) {
        return {invalidPrice: {value: control.value}}
      }

      if (current < 0) {
        control.setValue(Math.abs(current));
      }

      return (current < min) ? {priceTooLow: {value: control.value}} : null;
    }

    return null;
  };
}
