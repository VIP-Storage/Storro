import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss']
})
export class SimpleTableComponent implements OnInit {

  @Input()
  columns: {name: string; title: string}[] =  [];

  @Input()
  rowTemplate!: TemplateRef<any>;

  @Input()
  data: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor() { }

  ngOnInit(): void {
  }


  sortData(sort: Sort) {
    console.log('sort', sort);
  }
}
