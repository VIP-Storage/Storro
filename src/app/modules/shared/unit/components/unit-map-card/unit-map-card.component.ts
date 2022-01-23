import {Component, Input, OnInit} from '@angular/core';
import {Unit} from "../../../../../data/types";

@Component({
  selector: 'app-unit-map-card',
  templateUrl: './unit-map-card.component.html',
  styleUrls: ['./unit-map-card.component.scss']
})
export class UnitMapCardComponent implements OnInit {

  @Input()
  unit?: Unit;

  constructor() { }

  ngOnInit(): void {
  }

}
