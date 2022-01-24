import {Component, Input} from '@angular/core';
import {storroAnimations} from "../../animations";

@Component({
  selector: 'app-spinner-button',
  templateUrl: './spinner-button.component.html',
  styleUrls: ['./spinner-button.component.scss'],
  animations: storroAnimations
})
export class SpinnerButtonComponent {

  @Input()
  disabled: boolean = false;

  @Input()
  submitted: boolean = false;
}
