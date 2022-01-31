import {Injectable} from '@angular/core';
import {forkJoin, Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {UnitAccessEntryType, UnitDataType, Unit, UnitByType, GeoJSONObject} from "../../../data/types";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Burly} from "kb-burly";
import {DomSanitizer} from "@angular/platform-browser";
import {CreateUnitRequest} from "../../../data/requests";
import {AvailabilitySummaryResponse, IResponse, ManyResponse} from "../../../data/response";

const CORDOVA_MAP_URL = 'assets/map/cordova/storage-unit-layout.geojson';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  private readonly apiEndpoint: string = environment.http.url;

  constructor(private httpClient: HttpClient) {
  }

  getMapGeoJSON() {
    return this.httpClient.get<GeoJSONObject>(CORDOVA_MAP_URL)
  }

  getUnitsAvailabilitySummary(): Observable<AvailabilitySummaryResponse> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit')
      .addSegment('/availability')
      .addSegment('/summary')
      .get

    return this.httpClient.get<AvailabilitySummaryResponse>(url);
  }

  getUnitsMapDetails() {
    const geoJSON = this.getMapGeoJSON().pipe(
      map(value => {
        return {value, type: 'geoJSON'}
      })
    );

    const summary = this.getUnitsAvailabilitySummary().pipe(
      map(value => {
        return {value, type: 'availability'}
      })
    );

    return forkJoin(geoJSON, summary).pipe(
      map(forked => {
        const geoJSONObject: GeoJSONObject = forked.find(f => f.type === 'geoJSON')!.value as GeoJSONObject;
        const availability: {[key: string]: boolean} = forked.find(f => f.type === 'availability')!.value as unknown as {[key: string]: boolean};

        return {
          geoJSONObject,
          availability
        }
      })
    )
  }

  getUnits(pageNumber: number = 0, pageSize: number = 25, sortDirection: any = 'asc', sortBy: string = 'id', search: string | null = null): Observable<ManyResponse<Unit>> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit')
      .addSegment('/list')
      .addQuery('page', pageNumber + 1)
      .addQuery('limit', pageSize)
      .addQuery('sortDirection', sortDirection)
      .addQuery('sortBy', sortBy)
      .addQuery('search', search)
      .get

    return this.httpClient.get<ManyResponse<Unit>>(url);
  }

  getUnit(id: string): Observable<Unit | null> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit/')
      .addSegment(id)
      .get

    return this.httpClient.get<Unit | null>(url).pipe(
      catchError(err => {
        console.warn('Could not retrieve unit', err);
        return of(null)
      })
    )
  }

  unitExists(id: string): Observable<boolean> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit')
      .addSegment('/exists/')
      .addSegment(id)
      .get

    return this.httpClient.get<boolean>(url).pipe(
      catchError(err => {
        console.warn('Could not retrieve unit', err);
        return of(false)
      })
    )
  }

  createUnit(id: string,
             location: string,
             unitType: string,
             unitTypeName: string) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit')
      .addSegment('/create')
      .get

    const request: CreateUnitRequest = {
      id, location, unitType, unitTypeName
    };

    return this.httpClient.post(url, request);
  }

  rentUnit(paymentMethod: string, unitType: string) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit')
      .addSegment('/rent')
      .get

    return this.httpClient.post<IResponse<Unit>>(url, {paymentMethod, unitType});
  }

  importUnitsJSON(location: string, unitType: string, idFieldKey: string, arrayRootFieldKey: string, json: any) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit')
      .addSegment('/import')
      .addSegment('/json')
      .get

    return this.httpClient.post<IResponse>(url, {
      location,
      unitType,
      idFieldKey,
      arrayRootFieldKey,
      json
    })
  }

  getUnitSnapshotURL(unit: Unit, domSanitizer: DomSanitizer): Observable<any> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit')
      .addSegment('/snapshot/')
      .addSegment(unit.id)
      .addQuery('now', Math.random())
      .get

    return this.httpClient.get(url, {responseType: 'blob'}).pipe(
      map(e => domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e)))
    );
  }

  getUnitData(unit: Unit): Observable<UnitDataType> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit')
      .addSegment('/state/')
      .addSegment(unit.id)
      .get;

    return this.httpClient.get<UnitDataType>(url);
  }

  getUnitAccessHistory(unit?: Unit): Observable<UnitAccessEntryType[]> {
    // TODO: Replace this with proper backend call
    return of([]);
  }

  getAvailableUnitsByType(): Observable<UnitByType[]> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/unit')
      .addSegment('/available')
      .addSegment('/by-type')
      .get;

    return this.httpClient.get<UnitByType[]>(url);
  }

}
