import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {ToggleOptionType} from "../../../../data/types";

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent {

  @Input()
  @HostBinding('class.reversed')
  reversed: boolean = false;

  @Input()
  set options(newValue: ToggleOptionType[]) {
    if (!!newValue && !!newValue[0]) {
      this._options = newValue;
      this.selected = newValue[0];
    }
  }

  get options() {
    return this._options;
  }

  @Input()
  set selected(newValue: ToggleOptionType) {
    if (!!newValue) {
      this._selected = newValue;
    }
  }

  @Output()
  selectedChange = new EventEmitter<ToggleOptionType>();

  private _selected!: ToggleOptionType;
  private _options: ToggleOptionType[] = [];

  hasIcon(option: ToggleOptionType): boolean {
    return !!option.icon
  }

  title(option: ToggleOptionType): string {
    if (!!option.text && option.text.length > 0) {
      return option.text
    }

    return `${option.value}`;
  }

  isSelected(option: ToggleOptionType): boolean {
    if (!!this._selected) {
      return option.value === this._selected.value;
    }

    return false;
  }

  click(option: ToggleOptionType) {
    this.selected = option;
    this.selectedChange.emit(option);
  }
}
