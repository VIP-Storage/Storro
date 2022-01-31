import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-loading-shade',
  template: '<mat-spinner diameter="22"></mat-spinner>',
  styleUrls: ['./loading-shade.component.scss']
})
export class LoadingShadeComponent {

  @Input()
  set showBackground(newValue: string | boolean) {
    if (typeof newValue === "string") {
      this._showBackground = (!!newValue);
    } else {
      this._showBackground = newValue as boolean;
    }
  }

  @HostBinding('class.background') get background() {
    return this._showBackground;
  }

  private _showBackground = false;
}
