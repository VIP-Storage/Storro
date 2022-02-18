import {Injectable} from "@angular/core";
import {NativeDateAdapter} from "@angular/material/core";
import {DateTime} from "luxon";

const FORMAT = 'mm/dd/yyyy';

@Injectable()
export class FormDateAdapter extends NativeDateAdapter {
  format(date: Date): string {
    return DateTime.fromJSDate(date).toFormat(FORMAT)
  }

  parse(value: any): Date | null {
    if (!DateTime.fromFormat(value, FORMAT).isValid) {
      return this.invalid();
    }

    return DateTime.fromFormat(value, FORMAT).toJSDate();
  }
}
