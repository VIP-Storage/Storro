import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {MqttService} from "ngx-mqtt";
import {ChartDataType, DoorState} from "../../../data/enums";
import {ChartData, Unit} from "../../../data/types";
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

  getChartData(unit: Unit, dataType: ChartDataType, take: number|null = null): Observable<ChartData|any> {
    switch (dataType) {
      case ChartDataType.HUMIDITY:
        return this.getHumidityChartData(unit, take);
      case ChartDataType.TEMPERATURE:
        return this.getTemperatureChartData(unit, take);
    }
  }

  getHumidityChartData(unit: Unit, take: number|null = null): Observable<ChartData|any> {
    return this.httpClient.get<ChartData>(
      Burly(this.apiEndpoint)
        .addSegment('/unit')
        .addSegment('/humidity/')
        .addSegment('A100') // TODO FIX LATER
        .addQuery('take', take, false)
        .get
    ).pipe(
      catchError(err => {
        console.warn('Chart data error', err);
        return of({});
      })
    )
  }

  getTemperatureChartData(unit: Unit, take: number|null = null): Observable<ChartData|any> {
    return this.httpClient.get<ChartData>(
      Burly(this.apiEndpoint)
        .addSegment('/unit')
        .addSegment('/temperature/')
        .addSegment('A100') // TODO FIX LATER
        .addQuery('take', take, false)
        .get
    ).pipe(
      catchError(err => {
        console.warn('Chart data error', err);
        return of({});
      })
    )
  }

  getLiveTemperatureChartData(unit: Unit|string): Observable<number|null> {
    let _unit = unit;

    if (unit.hasOwnProperty('id')) {
      _unit = (unit as Unit).id;
    }

    // TODO REPLACE LATER
    _unit = 'A100';
    return this.mqttService.observe(`sensors/${_unit}/temperature`).pipe(
      map(message => Number(message.payload.toString())),
      catchError(err => {
        console.warn('Chart live data error', err);
        return of(null);
      })
    );
  }

  getLiveHumidityChartData(unit: Unit|string): Observable<number|null> {
    let _unit = unit;

    if (unit.hasOwnProperty('id')) {
      _unit = (unit as Unit).id;
    }

    // TODO REPLACE LATER
    _unit = 'A100';
    return this.mqttService.observe(`sensors/${_unit}/humidity`).pipe(
      map(message => Number(message.payload.toString())),
      catchError(err => {
        console.warn('Chart live data error', err);
        return of(null);
      })
    );
  }

  getLiveDoorState(unit: Unit|string): Observable<DoorState> {
    let _unit = unit;

    if (unit.hasOwnProperty('id')) {
      _unit = (unit as Unit).id;
    }

    // TODO REPLACE LATER
    _unit = 'A100';
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
