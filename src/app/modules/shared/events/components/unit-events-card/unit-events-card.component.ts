import {Component, Input} from '@angular/core';
import {Unit} from "../../../../../data";
import {ReplaySubject} from "rxjs";

@Component({
  selector: 'app-unit-events-card',
  templateUrl: './unit-events-card.component.html',
  styleUrls: ['./unit-events-card.component.scss']
})
export class UnitEventsCardComponent {

  @Input() set unit(newValue: Unit) {
    if (!!newValue) {
      this.$currentUnit.next(newValue);
    }
  }

  $currentUnit: ReplaySubject<Unit> = new ReplaySubject<Unit>();
}
