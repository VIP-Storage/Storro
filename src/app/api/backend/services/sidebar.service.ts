import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SidebarItem} from "../../../data/types";
import {Burly} from "kb-burly";
import {shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private readonly apiEndpoint: string = environment.http.url;


  constructor(private httpClient: HttpClient) {
  }

  getSidebarItems(): Observable<SidebarItem[]> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/sidebar')
      .addSegment('/items')
      .get;

    return this.httpClient.get<SidebarItem[]>(url).pipe(
      shareReplay()
    )
  }
}
