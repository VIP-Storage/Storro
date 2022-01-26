import {Injectable} from '@angular/core';
import {Unit, User} from "../../../data/types";
import {delay, map, shareReplay, tap} from "rxjs/operators";
import {Burly} from "kb-burly";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Role} from "../../../data/enums";
import {ManyResponse} from "../../../data/response/many.response";
import {IResponse} from "../../../data/response/response.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiEndpoint: string = environment.http.url;
  private $currentUser: Observable<User>|null = null;
  private $currentRole: Observable<Role>|null = null;

  constructor(private httpClient: HttpClient) {
  }

  clearCache() {
    this.$currentRole = null;
    this.$currentUser = null;
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
      )
    }

    return this.$currentRole!;
  }

  getTenants(pageNumber: number, pageSize: number, sortBy?: string, sortDirection?: any, searchValue?: string|null) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/users')
      .addSegment('/tenants')
      .addQuery('limit', pageSize)
      .addQuery('page', pageNumber + 1)
      .addQuery('sortBy', sortBy, false)
      .addQuery('sortDirection', sortDirection, false)
      .addQuery('search', searchValue, false)
      .get;


    return this.httpClient.get<ManyResponse<User>>(url)
  }

  getUsers(pageNumber: number, pageSize: number, sortBy?: string, sortDirection?: any, searchValue?: string|null) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/users')
      .addSegment('/list')
      .addQuery('limit', pageSize)
      .addQuery('page', pageNumber + 1)
      .addQuery('sortBy', sortBy, false)
      .addQuery('sortDirection', sortDirection, false)
      .addQuery('search', searchValue, false)
      .get;


    return this.httpClient.get<ManyResponse<User>>(url)
  }

  update(user: User): Observable<IResponse> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/users/')
      .addSegment(`${user.id}`)
      .get;

    return this.httpClient.patch<IResponse>(url, user);
  }
}
