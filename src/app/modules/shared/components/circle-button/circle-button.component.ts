import {Component, ElementRef, Input} from '@angular/core';
import {ThemePalette} from "@angular/material/core/common-behaviors/color";

@Component({
  selector: 'app-circle-button',
  templateUrl: './circle-button.component.html',
  styleUrls: ['./circle-button.component.scss']
})
export class CircleButtonComponent {

  private _color: ThemePalette;

  @Input()
  get color(): ThemePalette {
    return this._color;
  }

  set color(value: ThemePalette) {
    const colorPalette = value || 'primary';

    if (colorPalette !== this._color) {
      if (this._color) {
        this.elementRef.nativeElement.classList.remove(`mat-${this._color}`);
      }
      if (colorPalette) {
        this.elementRef.nativeElement.classList.add(`mat-${colorPalette}`);
      }

      this._color = colorPalette;
    }
  }

  constructor(private elementRef: ElementRef) {
  }


  getHostElement() {
    return this.elementRef.nativeElement;
  }

}
