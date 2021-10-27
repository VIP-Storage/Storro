import {Injectable} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {

  set title(newValue: string) {
    this.updateTitle(newValue);
  }

  get title() {
    return this._title.getTitle().split('|')[1];
  }

  constructor(private _title: Title) {
  }

  private updateTitle(newValue: string) {
    if (!!newValue && newValue.length) {
      this._title.setTitle(`Storro | ${newValue}`);
    } else {
      this._title.setTitle('Storro');
    }
  }
}
