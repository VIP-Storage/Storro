import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
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
export class UnitChartComponent {

  @Input() set type(newValue: ChartDataType | null) {
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

  @Input() set large(newValue: any) {
    if (!!newValue && newValue !== 'false') {
      this._large = true;
    }
  }

  @Input() set paused(newValue: boolean) {
    if (newValue && !this._paused) {
      this._paused = true;
    } else if (!newValue && this._paused) {
      this._paused = false;
    }
  }

  @Output() current = new EventEmitter<string>();

  get title(): string {
    return this._type.toString().toLowerCase();
  }

  get large(): boolean {
    return this._large;
  }

  hasLoadedInitial = false;
  maxValue?: string;
  minValue?: string;
  measurementUnit!: string;
  chartData: { name: string, series: { name: any, value: any }[] }[] = [];
  data: BehaviorSubject<ChartData | null> = new BehaviorSubject<ChartData | null>(null);
  chartScheme!: Color;

  private _queue: any[] = [];
  private _paused = false;
  private _large = false;
  private _liveSub?: Subscription;
  private _domain: string[] | number[] = [];
  private _unit!: UnitType;
  private _type!: ChartDataType;


  constructor(private sensorsService: SensorsService) {
    this.data.pipe(
      filter(d => !!d)
    ).subscribe(data => this.parseData(data as ChartData));
  }

  get animations() {
    if (this.large) {
      return this.hasLoadedInitial;
    }

    return true;
  }

  private get maxEventLen() {
    return this._large ? 100 : 35;
  }

  getTooltipText(type: 'max' | 'min'): string {
    return `${type === 'max' ? 'Maximum' : 'Minimum'} ${this.title}`;
  }


  private fetchData() {
    if (!this._unit || !this._type) {
      return;
    }

    this.sensorsService.getChartData(this._unit, this._type, this.maxEventLen).subscribe(this.data);
    this.attachLiveData(this._type);
  }

  private parseData(data: ChartData) {
    this.measurementUnit = data.measurementUnit;

    this.updateMinMax(data.values.map(v => v.value));

    this.chartData = [
      {
        name: data.name,
        series: [
          ...data.values.map(v => ({
            value: `${v.value}`,
            name: v.date
          }))
        ]
      }
    ];
  }

  private updateMinMax(values: number[]) {
    const min = Math.min.apply(null, values);
    const max = Math.max.apply(null, values);

    this.minValue = `${min}${this.measurementUnit}`
    this.maxValue = `${max}${this.measurementUnit}`
    this._domain = values;
  }

  private attachLiveData(type: ChartDataType) {
    switch (type) {
      case ChartDataType.TEMPERATURE:
        this._liveSub = this.sensorsService.getLiveTemperatureChartData(this._unit).subscribe(
          newData => this.appendPoint(newData)
        );

        break;
      case ChartDataType.HUMIDITY:
        this._liveSub = this.sensorsService.getLiveHumidityChartData(this._unit).subscribe(
          newData => this.appendPoint(newData)
        );
        break;
    }
  }

  private appendPoint(value: number) {
    const currentData = this.chartData[0];
    const now = new Date();

    this.current.emit(`${value}`);

    if (!currentData || !currentData.series) {
      return;
    }

    const newData = {
      value: `${value}`,
      name: now.toISOString()
    };

    if (this._paused) {
      this._queue.push(newData);
      return;
    }

    const currentSeries = currentData.series;
    const newSeries = [
      ...currentSeries,
      ...this._queue,
      newData
    ];

    this.updateMinMax(newSeries.map(v => v.value));


    this.chartData = [
      {
        name: currentData.name,
        series: newSeries.slice(Math.max(newSeries.length - this.maxEventLen, 0))
      }
    ];

    this._queue = [];
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
