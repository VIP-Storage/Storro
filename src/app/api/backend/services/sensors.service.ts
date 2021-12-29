import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {MqttService} from "ngx-mqtt";
import {ChartDataType} from "../../../data/enums";
import {ChartData, UnitType} from "../../../data/types";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Burly} from "kb-burly";

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  private readonly apiEndpoint: string = environment.http.url;

  constructor(private mqttService: MqttService,
              private httpClient: HttpClient) {
  }

  getChartData(unit: UnitType, dataType: ChartDataType, take: number|null = null): Observable<ChartData> {
    switch (dataType) {
      case ChartDataType.HUMIDITY:
        return this.getHumidityChartData(unit, take);
      case ChartDataType.TEMPERATURE:
        return this.getTemperatureChartData(unit, take);
    }
  }

  getHumidityChartData(unit: UnitType, take: number|null = null): Observable<ChartData> {
    return this.httpClient.get<ChartData>(
      Burly(this.apiEndpoint)
        .addSegment('/stats')
        .addSegment('/humidity')
        .addSegment('/unit69')
        .addQuery('take', take, false)
        .get
    );
  }

  getTemperatureChartData(unit: UnitType, take: number|null = null): Observable<ChartData> {
    return this.httpClient.get<ChartData>(
      Burly(this.apiEndpoint)
        .addSegment('/stats')
        .addSegment('/temperature')
        .addSegment('/unit69')
        .addQuery('take', take, false)
        .get
    );
  }

  getLiveTemperatureChartData(unit: UnitType): Observable<number> {
    return this.mqttService.observe("sensors/unit69/temperature/").pipe(
      map(message => Number(message.payload.toString()))
    );
  }

  getLiveHumidityChartData(unit: UnitType): Observable<number> {
    return this.mqttService.observe("sensors/unit69/humidity/").pipe(
      map(message => Number(message.payload.toString()))
    );
  }
}
