import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-no-data-shade',
  templateUrl: './no-data-shade.component.html',
  styleUrls: ['./no-data-shade.component.scss']
})
export class NoDataShadeComponent implements OnInit {

  @Input()
  entityName: string = 'Data';

  constructor() { }

  ngOnInit(): void {
  }

}
