import {Injectable} from '@angular/core';
import {UnitType, User} from "../../../data/types";
import {delay, map, shareReplay, tap} from "rxjs/operators";
import {Burly} from "kb-burly";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Role} from "../../../data/enums";
import {ManyResponse} from "../../../data/response/many.response";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiEndpoint: string = environment.http.url;
  private $currentUser: Observable<User>|null = null;
  private $currentRole: Observable<Role>|null = null;

  constructor(private httpClient: HttpClient) {
  }

  get currentUser(): Observable<User> {
      if (!this.$currentUser) {
        const url = Burly(this.apiEndpoint)
          .addSegment('/users')
          .addSegment('/me')
          .get;

        this.$currentUser = this.httpClient.get<User>(url).pipe(
          shareReplay(1)
        )
      }

    return this.$currentUser!;
  }

  get currentRole(): Observable<Role> {
    if (!this.$currentRole) {
      this.$currentRole = this.currentUser.pipe(
        map(user => user.role),
        shareReplay(1)
      )
    }

    return this.$currentRole!;
  }

  getTenants(pageNumber: number, pageSize: number, sortBy?: string, sortDirection?: any) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/users')
      .addSegment('/tenants')
      .addQuery('limit', pageSize)
      .addQuery('page', pageNumber)
      .addQuery('sortBy', sortBy, false)
      .addQuery('sortDirection', sortDirection, false)
      .get;


    return this.httpClient.get<ManyResponse<User>>(url)
  }
}
