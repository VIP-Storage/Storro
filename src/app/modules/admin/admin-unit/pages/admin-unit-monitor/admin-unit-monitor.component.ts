import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {Unit} from "../../../../../data/types";
import {map, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {UnitsService} from "../../../../../api/backend/services/units.service";
import {PageTitleService} from "../../../../../services/page-title.service";

@Component({
  selector: 'app-admin-unit-monitor',
  templateUrl: './admin-unit-monitor.component.html',
  styleUrls: ['./admin-unit-monitor.component.scss']
})
export class AdminUnitMonitorComponent {
  unit: Observable<Unit>;

  private returnToURL: string | null = null;

  constructor(private activatedRoute: ActivatedRoute,
              private unitsService: UnitsService,
              private pageTitleService: PageTitleService) {
    this.unit = this.activatedRoute.data.pipe(
      map(data => data.unit),
      tap(unit => this.pageTitleService.title = `${unit.id} | Monitor`)
    );

    this.activatedRoute.queryParams.subscribe(params => {
      if (params.hasOwnProperty('root')) {
        this.returnToURL = params.root;
      }
    });
  }

  get backRouterLink() {
    return this.returnToURL || '../'
  }
}
