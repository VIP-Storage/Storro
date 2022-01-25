import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Burly} from "kb-burly";
import {tap} from "rxjs/operators";
import {DateTime} from "luxon";
import {IResponse} from "../../../data/response/response.interface";
import {Observable} from "rxjs";
import {Role} from "../../../data/enums";
import {User} from "../../../data/types";

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly apiEndpoint: string = environment.http.url;

  constructor(private httpClient: HttpClient) {
  }

  login(email: string, password: string) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/auth')
      .addSegment('/login')
      .get;

    return this.httpClient.post<IResponse>(url, {email, password}).pipe(
      tap(response => {
        if (response.success) {
          const authResponse: { expiresIn: string, idToken: string } = response.data as any;

          AuthService.setSession(authResponse)
        }
      })
    )
  }

  register(email: string, password: string, firstName: string, lastName: string): Observable<IResponse> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/auth')
      .addSegment('/register')
      .get;

    return this.httpClient.post<IResponse>(url, {email, password, firstName, lastName});
  }

  create(email: string, firstName: string, lastName: string, role: Role): Observable<IResponse> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/auth')
      .addSegment('/create')
      .get;

    return this.httpClient.post<IResponse>(url, {email, role, firstName, lastName});
  }

  verify(token: string): Observable<IResponse> {
    const url = Burly(this.apiEndpoint)
      .addSegment('/auth')
      .addSegment('/verify/')
      .addSegment(token)
      .get;

    return this.httpClient.get<IResponse>(url);
  }

  sendPasswordResetEmail(email: string) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/auth')
      .addSegment('/forgot-password/')
      .addSegment(email)
      .get;

    return this.httpClient.get<IResponse>(url)
  }

  sendPasswordResetRequest(token: string, newPassword: string) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/auth')
      .addSegment('/reset-password')
      .get;

    return this.httpClient.post<IResponse>(url, {newPassword, newPasswordToken: token})
  }

  private static setSession(authResult: { expiresIn: string, idToken: string } | null) {
    if (!!authResult) {
      const expiresAt = DateTime.now().plus({
        hours: Number(authResult.expiresIn.replace(/\D/g, ''))
      });

      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    }
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return DateTime.now() < this.getExpiration();
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");

    if (!!expiration) {
      const expiresAt = JSON.parse(expiration);
      return DateTime.fromMillis(expiresAt)
    }

    return DateTime.now();
  }
}
