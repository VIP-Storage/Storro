import {Component} from '@angular/core';
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {UnitType} from "../../../../data/types";
import {ActivatedRoute} from "@angular/router";
import {PageTitleService} from "../../../../services/page-title.service";
import {ChartDataType} from "../../../../data/enums";

@Component({
  selector: 'app-client-unit-chart',
  templateUrl: './client-unit-chart.component.html',
  styleUrls: ['./client-unit-chart.component.scss']
})
export class ClientUnitChartComponent {

  paused = false;
  unit: Observable<UnitType>;
  chartType: Observable<ChartDataType>;
  title: Observable<string>;

  constructor(private activatedRoute: ActivatedRoute,
              private pageTitleService: PageTitleService) {

    this.unit = this.activatedRoute.data.pipe(
      map(data => data.unit),
      tap(unit => this.pageTitleService.title = `${unit.name} Chart`),
    );

    this.chartType = this.activatedRoute.data.pipe(
      map(data => data.type as ChartDataType),
    );

    this.title = this.chartType.pipe(
      map(type => {
        return `${type} chart`
      })
    )
  }
}
