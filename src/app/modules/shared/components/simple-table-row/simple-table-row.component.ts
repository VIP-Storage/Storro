import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-table-row',
  template: '<ng-content></ng-content>',
  styleUrls: ['./simple-table-row.component.scss']
})
export class SimpleTableRowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
