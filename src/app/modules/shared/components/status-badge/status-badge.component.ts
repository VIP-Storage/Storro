import {Component, Input, OnInit} from '@angular/core';
import {StatusBadge} from "./status-badge.type";

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.scss']
})
export class StatusBadgeComponent implements OnInit {

  @Input()
  mappedValues: StatusBadge[] = [];

  @Input()
  currentValue!: string|boolean;

  constructor() { }

  ngOnInit(): void {
  }

  getDisplayName(value: string|boolean) {
    const mappedValue = this.mappedValues.find(v => v.value === value);

    if (!!mappedValue) {
      return mappedValue.display;
    }

    return 'Unknown';
  }

  getDisplayClass(value: string|boolean) {
    const mappedValue = this.mappedValues.find(v => v.value === value);

    if (!!mappedValue) {
      return mappedValue.color;
    }

    return 'none';
  }

}
