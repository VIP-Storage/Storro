import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ManyResponse} from "../../../data/response/many.response";
import {UnitType} from "../../../data/types";
import {Burly} from "kb-burly";
import {CreateUnitTypeRequest} from "../../../data/requests/create-unit-type.request";
import {map, shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UnitTypesService {

  private readonly apiEndpoint: string = environment.http.url;


  constructor(private httpClient: HttpClient) {
  }

  getUnitTypes(): Observable<ManyResponse<UnitType>> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit-types')
      .addSegment('/list')
      .get

    return this.httpClient.get<ManyResponse<UnitType>>(url);
  }

  unitTypeExists(name: string): Observable<boolean> {
    return this.getUnitTypes().pipe(
      shareReplay(),
      map(res => {
         return !!res.items.find(unitType => unitType.name === name)
      })
    );
  }

  createUnitType(name: string,
                 price: number,
                 description: string,
                 location: string,
                 billingInterval: string,
                 billingFrequency: number = 1) {

    const request: CreateUnitTypeRequest = {
      name,
      price,
      description,
      location,
      billingInterval,
      billingFrequency
    }

    const url = Burly(this.apiEndpoint)
      .addSegment('/unit-types')
      .addSegment('/create')
      .get

    return this.httpClient.post(url, request);
  }
}
