import {AfterViewInit, Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {SimpleTableEvent} from "./simple-table.event";

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss']
})
export class SimpleTableComponent implements AfterViewInit {

  @Input()
  columns: { name: string; title: string }[] = [];

  @Input()
  rowTemplate!: TemplateRef<any>;

  @Input()
  data: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output()
  tableEvent: EventEmitter<SimpleTableEvent> = new EventEmitter<SimpleTableEvent>();

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.emitUpdate()
    })
  }

  private emitUpdate() {
    this.tableEvent.emit({
      active: this.sort.active,
      direction: this.sort.direction
    })
  }
}
