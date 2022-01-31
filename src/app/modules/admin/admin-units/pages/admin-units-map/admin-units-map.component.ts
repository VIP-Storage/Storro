import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {debounceTime, tap} from "rxjs/operators";
import {PageTitleService} from "../../../../../services/page-title.service";
import {MatDrawer, MatDrawerContainer, MatSidenav, MatSidenavContainer} from "@angular/material/sidenav";
import {UnitsService} from "../../../../../api/backend/services/units.service";
import {Unit} from "../../../../../data/types";

@Component({
  selector: 'app-admin-units-map',
  templateUrl: './admin-units-map.component.html',
  styleUrls: ['./admin-units-map.component.scss']
})
export class AdminUnitsMapComponent implements OnInit {

  @ViewChild(MatSidenavContainer, {static: true}) sidenavContainer!: MatSidenavContainer;
  @ViewChild(MatSidenav, {static: true}) sidenav!: MatSidenav;

  searchText: Observable<string>;

  currentUnit?: Unit;

  private _currentSearch: Subject<string> = new Subject<string>();

  constructor(private pageTitleService: PageTitleService,
              private unitsService: UnitsService,
              private changeDetector: ChangeDetectorRef) {
    this.searchText = this._currentSearch.pipe(
      debounceTime(1000)
    );

    this.pageTitleService.title = 'Units Map';
  }

  ngOnInit(): void {
  }

  searchChanged(newValue: string) {
    this._currentSearch.next(newValue);
  }

  unitPopupOpened(unitID: string|null) {
   if (!!unitID) {
     this.unitsService.getUnit(unitID).pipe(
     ).subscribe(unit => {
       if (!!unit) {
         this.currentUnit = unit;
         this.sidenav.open().then();
       }
     });
   } else {
     this.sidenav.close().then();
   }

    this.updateView()
  }

  private updateView() {
      setTimeout(() => {
        this.changeDetector.detectChanges();
      }, 100);
  }
}
