import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Burly} from "kb-burly";
import {IResponse, ManyResponse} from "../../../data/response";
import {Keycard, KeycardRequest, User} from "../../../data/types";
import {UserService} from "./user.service";
import {Role} from "../../../data/enums";

@Injectable({
  providedIn: 'root'
})
export class KeycardsService {

  private currentUser?: User;
  private currentRole?: Role;
  private readonly apiEndpoint: string = environment.http.url;

  constructor(private httpClient: HttpClient,
              private userService: UserService) {

    this.userService.currentUser.subscribe(user => this.currentUser = user);
    this.userService.currentRole.subscribe(role => this.currentRole = role);
  }

  createKeycard(cardCode: number, facilityCode: number, ownerID: number, name?: string) {
    const request = {
      owner: ownerID,
      cardCode,
      facilityCode,
      name
    }

    const url = Burly(this.apiEndpoint)
      .addSegment('/keycards')
      .get;

    return this.httpClient.post<IResponse<Keycard>>(url, request);
  }

  getKeycard(id: string) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/keycards/')
      .addSegment(id)
      .get;

    return this.httpClient.get<Keycard>(url);
  }

  deleteKeycard(id: string) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/keycards/')
      .addSegment(id)
      .get;

    return this.httpClient.delete(url);
  }

  updateKeyCard(id: string, name?: string, cardCode?: number, facilityCode?: number) {
    const url =  Burly(this.apiEndpoint)
      .addSegment('/keycards/')
      .addSegment(id)
      .get;

    const request = {
      name,
      cardCode,
      facilityCode
    };

    return this.httpClient.patch<IResponse<Keycard>>(url, request);
  }

  getKeycards(pageNumber: number, pageSize: number, sortBy?: string, sortDirection?: any, searchValue?: string | null, currentUser: boolean = false) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/keycards')
      .addSegment('/list')
      .addQuery('limit', pageSize)
      .addQuery('page', pageNumber + 1)
      .addQuery('sortBy', sortBy, false)
      .addQuery('sortDirection', sortDirection, false)
      .addQuery('search', searchValue, false)
      .addQuery('forUser', (currentUser ? this.currentUser?.id : null), false)
      .get;


    return this.httpClient.get<ManyResponse<Keycard>>(url);
  }

  getKeycardRequests(pageNumber: number, pageSize: number, sortBy?: string, sortDirection?: any, searchValue?: string | null, currentUser: boolean = false) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/keycard')
      .addSegment('/requests')
      .addSegment('/list')
      .addQuery('limit', pageSize)
      .addQuery('page', pageNumber + 1)
      .addQuery('sortBy', sortBy, false)
      .addQuery('sortDirection', sortDirection, false)
      .addQuery('search', searchValue, false)
      .addQuery('forUser', (currentUser ? this.currentUser?.id : null), false)
      .get;


    return this.httpClient.get<ManyResponse<KeycardRequest>>(url);
  }

  requestKeycard(name: string, comments?: string) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/keycard')
      .addSegment('/requests')
      .get;

    return this.httpClient.post<IResponse<KeycardRequest>>(url, {comments, name});
  }

  approveRequest(request: KeycardRequest, cardCode: number, facilityCode: number, name?: string) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/keycard')
      .addSegment('/requests')
      .addSegment('/approve/')
      .addSegment(request.id)
      .get;

    return this.httpClient.post<IResponse<KeycardRequest>>(url, {owner: request.requestedByID, facilityCode, cardCode, name})
  }

  denyRequest(request: KeycardRequest, reason: string) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/keycard')
      .addSegment('/requests')
      .addSegment('/deny/')
      .addSegment(request.id)
      .get;

    return this.httpClient.post<IResponse<KeycardRequest>>(url, {reason})
  }

  updateLost(keycard: Keycard, lost: boolean) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/keycards')
      .addSegment('/lost')
      .addSegment(`/${keycard.id}/`)
      .addSegment(`${lost}`)
      .get;

    return this.httpClient.get<IResponse<Keycard>>(url)
  }
}
