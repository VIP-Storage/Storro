import {Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-simple-table-row',
  template: `
    <ng-container *ngTemplateOutlet="templateOutlet; context: {$implicit: item}"></ng-container>
    <ng-content></ng-content>
  `,
  styleUrls: ['./simple-table-row.component.scss']
})
export class SimpleTableRowComponent implements OnInit {

  @Input() item: any;
  @ContentChild(TemplateRef) templateOutlet!: TemplateRef<any>

  constructor() { }

  ngOnInit(): void {
  }

}
