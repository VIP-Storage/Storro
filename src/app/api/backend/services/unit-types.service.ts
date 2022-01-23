import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ManyResponse} from "../../../data/response/many.response";
import {UnitType} from "../../../data/types";
import {Burly} from "kb-burly";

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
}
