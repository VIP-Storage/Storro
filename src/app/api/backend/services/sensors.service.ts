import {Injectable} from '@angular/core';
import {UnitType} from "../../../data/types/unit.type";
import {Observable, of} from "rxjs";
import {ChartData} from "../../../data/types/chart/chart-data.type";
import {delay} from "rxjs/operators";
import {getDemoHumidityData, getDemoTemperatureData} from "../../../data/demo/sensors-demo.data";
import {ChartDataType} from "../../../data/enums/chart-data.enum";

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  constructor() {
  }

  getChartData(unit: UnitType, dataType: ChartDataType): Observable<ChartData> {
    switch (dataType) {
      case ChartDataType.HUMIDITY:
        return this.getHumidityChartData(unit);
      case ChartDataType.TEMPERATURE:
        return this.getTemperatureChartData(unit);
    }
  }

  getHumidityChartData(unit: UnitType): Observable<ChartData> {
    return SensorsService.getHumidityChartDemoData(unit);
  }

  getTemperatureChartData(unit: UnitType): Observable<ChartData> {
    return SensorsService.getTemperatureChartDemoData(unit);
  }

  private static getHumidityChartDemoData(unit: UnitType): Observable<ChartData> {
    return of(getDemoHumidityData(unit)).pipe(delay(150));
  }

  private static getTemperatureChartDemoData(unit: UnitType): Observable<ChartData> {
    return of(getDemoTemperatureData(unit)).pipe(delay(150));
  }
}
