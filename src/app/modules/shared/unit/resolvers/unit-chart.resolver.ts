import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ChartDataType} from "../../../../data/enums";

@Injectable({
  providedIn: 'root'
})
export class UnitChartResolver implements Resolve<ChartDataType> {
  constructor() {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ChartDataType {
    const rawType = route.paramMap.get('type');

    if (!!rawType && rawType === 'humidity') {
        return ChartDataType.HUMIDITY;
    }

    return ChartDataType.TEMPERATURE;
  }
}
