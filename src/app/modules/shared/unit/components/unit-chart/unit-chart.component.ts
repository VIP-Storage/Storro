import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {filter} from "rxjs/operators";
import {Color, colorSets} from "@swimlane/ngx-charts";
import {ChartDataType} from "../../../../../data/enums";
import {ChartData, UnitType} from "../../../../../data/types";
import {SensorsService} from "../../../../../api/backend/services/sensors.service";

@Component({
  selector: 'app-unit-chart',
  templateUrl: './unit-chart.component.html',
  styleUrls: ['./unit-chart.component.scss']
})
export class UnitChartComponent implements OnInit {

  @Input() set type(newValue: ChartDataType) {
    if (!!newValue) {
      this._type = newValue;

      this.applyChartScheme(newValue);
      this.fetchData();
    }
  }

  @Input() set unit(newValue: UnitType) {
    if (!!newValue) {
      this._unit = newValue;
      this.fetchData();
    }
  }

  get title(): string {
    return this._type.toString().toLowerCase();
  }

  maxValue?: string;
  minValue?: string;
  measurementUnit!: string;
  chartData: {name: string, series: {name: any, value: any}[]}[] = [];
  data: BehaviorSubject<ChartData|null> = new BehaviorSubject<ChartData | null>(null);
  chartScheme!: Color;

  private _domain: string[] | number[] = [];
  private _unit!: UnitType;
  private _type!: ChartDataType;


  constructor(private sensorsService: SensorsService) {
    this.data.pipe(
      filter(d => !!d)
    ).subscribe(data => this.parseData(data as ChartData));
  }

  ngOnInit(): void {
  }

  getTooltipText(type: 'max' | 'min'): string {
    return `${type === 'max' ? 'Maximum' : 'Minimum'} ${this.title}`;
  }


  private fetchData() {
    if (!this._unit || !this._type) {
      return;
    }

    this.sensorsService.getChartData(this._unit, this._type).subscribe(this.data);
  }

  private parseData(data: ChartData) {
    const min = Math.min.apply(null, data.values.map(v => v.value));
    const max = Math.max.apply(null, data.values.map(v => v.value));

    this.measurementUnit = data.unit;

    this.minValue = `${min}${data.unit}`
    this.maxValue = `${max}${data.unit}`

    this._domain = data.values.map(v => v.value);
    this.chartData = [
      {
        name: data.name,
        series: [
          ...data.values.map(v => ({
            value: `${v.value}`,
            name: v.date.toDateString()
          }))
        ]
      }
    ];
  }

  private applyChartScheme(type: ChartDataType) {
    switch (type) {
      case ChartDataType.TEMPERATURE:
        this.chartScheme = colorSets.find(c => c.name === 'neons') as Color;
        break;
      case ChartDataType.HUMIDITY:
        this.chartScheme = colorSets.find(c => c.name === 'horizon') as Color;
        break;
    }
  }
}
