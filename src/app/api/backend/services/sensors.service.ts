import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {MqttService} from "ngx-mqtt";
import {ChartDataType, DoorState} from "../../../data/enums";
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
        .addSegment('/humidity/')
        .addSegment(unit.id)
        .addQuery('take', take, false)
        .get
    );
  }

  getTemperatureChartData(unit: UnitType, take: number|null = null): Observable<ChartData> {
    return this.httpClient.get<ChartData>(
      Burly(this.apiEndpoint)
        .addSegment('/stats')
        .addSegment('/temperature/')
        .addSegment(unit.id)
        .addQuery('take', take, false)
        .get
    );
  }

  getLiveTemperatureChartData(unit: UnitType|string): Observable<number> {
    let _unit = unit;

    if (unit.hasOwnProperty('id')) {
      _unit = (unit as UnitType).id;
    }

    return this.mqttService.observe(`sensors/${_unit}/temperature`).pipe(
      map(message => Number(message.payload.toString()))
    );
  }

  getLiveHumidityChartData(unit: UnitType|string): Observable<number> {
    let _unit = unit;

    if (unit.hasOwnProperty('id')) {
      _unit = (unit as UnitType).id;
    }

    return this.mqttService.observe(`sensors/${_unit}/humidity`).pipe(
      map(message => Number(message.payload.toString()))
    );
  }

  getLiveDoorState(unit: UnitType|string): Observable<DoorState> {
    let _unit = unit;

    if (unit.hasOwnProperty('id')) {
      _unit = (unit as UnitType).id;
    }

    return this.mqttService.observe(`sensors/${_unit}/door/state`).pipe(
      map(message => {
        const rawState = message.payload.toString();

        if (rawState === 'closed') {
          return DoorState.CLOSED;
        }

        return DoorState.OPEN;
      })
    );
  }
}
