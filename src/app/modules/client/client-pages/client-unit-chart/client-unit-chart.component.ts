import {Component} from '@angular/core';
import {map, tap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {UnitType} from "../../../../data/types";
import {ActivatedRoute} from "@angular/router";
import {PageTitleService} from "../../../../services/page-title.service";
import {ChartDataType} from "../../../../data/enums";
import {storroAnimations} from "../../../shared/animations";
import {B} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-client-unit-chart',
  templateUrl: './client-unit-chart.component.html',
  styleUrls: ['./client-unit-chart.component.scss'],
  animations: storroAnimations
})
export class ClientUnitChartComponent {

  paused = false;
  unit: Observable<UnitType>;
  chartType: Observable<ChartDataType>;
  chartValue = new BehaviorSubject<string>('');

  constructor(private activatedRoute: ActivatedRoute,
              private pageTitleService: PageTitleService) {

    this.unit = this.activatedRoute.data.pipe(
      map(data => data.unit),
      tap(unit => this.pageTitleService.title = `${unit.name} Chart`),
    );

    this.chartType = this.activatedRoute.data.pipe(
      map(data => data.type as ChartDataType),
    );
  }

  chartValueUpdated(newValue: string) {
    this.chartValue.next(newValue);
  }
}
