import {FormControl} from "@angular/forms";

export class ExpirationValidator {

  static driversLicense(c: FormControl) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear() - 2000;
    const valueString = `${c.value}`;

    if (!!valueString && valueString.length === 4) {
      const valueMonth = Number(valueString.substring(0, 2));
      const valueYear = Number(valueString.substring(2, 4));

      if (!Number.isNaN(valueMonth) && !Number.isNaN(valueYear)) {
        if (valueYear >= currentYear && valueMonth >= currentMonth) {
          return null;
        }

        return {
          validateExpiration: {
            valid: false,
            message: 'Cannot use an expired license'
          }
        }
      }
    }

    return {
      validateExpiration: {
        valid: false,
        message: 'Invalid format'
      }
    }
  }
}
