import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, takeUntil, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {UnitsService} from "../../../../../api/backend/services/units.service";
import {PageTitleService} from "../../../../../services/page-title.service";
import {Observable, Subject} from "rxjs";
import {Unit} from "../../../../../data/types";
import {storroAnimations} from "../../../../shared/animations";

@Component({
  selector: 'app-admin-unit-settings',
  templateUrl: './admin-unit-settings.component.html',
  styleUrls: ['./admin-unit-settings.component.scss'],
  animations: storroAnimations
})
export class AdminUnitSettingsComponent implements OnInit, OnDestroy {

  unit: Observable<Unit>;

  private destroyed = new Subject<boolean>();

  constructor(private activatedRoute: ActivatedRoute,
              private unitsService: UnitsService,
              private pageTitleService: PageTitleService) {

    this.unit = this.activatedRoute.data.pipe(
      map(data => data.unit),
      tap(unit => this.pageTitleService.title = unit.name),
      takeUntil(this.destroyed)
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroyed.next(true);
  }

}
