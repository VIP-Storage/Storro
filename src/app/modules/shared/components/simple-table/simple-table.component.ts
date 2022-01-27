import {AfterViewInit, Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {SimpleTableEvent} from "./simple-table.event";
import {storroAnimations} from "../../animations";

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss'],
  animations: storroAnimations
})
export class SimpleTableComponent implements AfterViewInit {

  @Input()
  columns: { name: string; title: string, noSort?: boolean }[] = [];

  @Input()
  rowTemplate!: TemplateRef<any>;

  @Input()
  data: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output()
  tableEvent: EventEmitter<SimpleTableEvent> = new EventEmitter<SimpleTableEvent>();

  @Output()
  rowEvent: EventEmitter<any> = new EventEmitter<any>();

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

  shouldSort(column: {name: string, title: string, noSort?: boolean}) {
    if (column.hasOwnProperty('noSort') && typeof column.noSort === "boolean") {
      return !column.noSort;
    }

    return true;
  }

  rowClick(data: any, event: Event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    this.rowEvent.emit(data);
  }
}
