import {Component} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Unit} from "../../../../../data/types";
import {ChartDataType} from "../../../../../data/enums";
import {ActivatedRoute} from "@angular/router";
import {PageTitleService} from "../../../../../services/page-title.service";
import {map, tap} from "rxjs/operators";
import {storroAnimations} from "../../../animations";

@Component({
  selector: 'app-unit-full-chart',
  templateUrl: './unit-full-chart.component.html',
  styleUrls: ['./unit-full-chart.component.scss'],
  animations: storroAnimations
})
export class UnitFullChartComponent {

  paused = false;
  unit: Observable<Unit>;
  chartType: Observable<ChartDataType>;
  chartValue = new BehaviorSubject<string>('');

  constructor(private activatedRoute: ActivatedRoute,
              private pageTitleService: PageTitleService) {

    this.unit = this.activatedRoute.data.pipe(
      map(data => data.unit),
      tap(unit => this.pageTitleService.title = `${unit.id} Chart`),
    );

    this.chartType = this.activatedRoute.data.pipe(
      map(data => data.type as ChartDataType),
    );
  }

  chartValueUpdated(newValue: string) {
    this.chartValue.next(newValue);
  }
}
