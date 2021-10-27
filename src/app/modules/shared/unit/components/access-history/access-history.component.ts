import {Component, Input, AfterViewInit, ViewChild} from '@angular/core';
import {UnitAccessEntryType} from "../../../../data/types/unit-access-entry.type";
import {merge, Observable, of} from "rxjs";
import {UnitsService} from "../../../../api/backend/services/units.service";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {UnitType} from "../../../../data/types/unit.type";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-access-history',
  templateUrl: './access-history.component.html',
  styleUrls: ['./access-history.component.scss']
})
export class AccessHistoryComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() unit?: UnitType;

  isLoading = true;
  displayedColumns: string[] = ['credential', 'date', 'unit'];
  accessHistoryData: UnitAccessEntryType[] = [];
  total = 0;


  constructor(private unitsService: UnitsService) {
  }


  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.unitsService.getUnitAccessHistory().pipe(
            catchError(() => of([]))
          );
        }),
        map(accessHistory => {
          this.isLoading = false;

          if (accessHistory === null) {
            return [];
          }

          this.total = accessHistory.length;
          return accessHistory;
        })
      ).subscribe(accessHistory => this.accessHistoryData = accessHistory);
  }
}
