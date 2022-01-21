import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Burly} from "kb-burly";
import {shareReplay, tap} from "rxjs/operators";
import {DateTime} from "luxon";
import {LoginResponse} from "../../../data/response/login.response";


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

    return this.httpClient.post<LoginResponse>(url, {email, password}).pipe(
      tap(response => AuthService.setSession(response)),
      shareReplay()
    )
  }

  sendPasswordResetEmail(email: string) {
    const url = Burly(this.apiEndpoint)
      .addSegment('/auth')
      .addSegment('/forgot-password/')
      .addSegment(email)
      .get;

    return this.httpClient.get<LoginResponse>(url)
  }

  private static setSession(authResult: LoginResponse | null) {
    if (!!authResult) {
      const expiresAt = DateTime.now().plus({
        hours: Number(authResult.expiresIn.replace(/\D/g,''))
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
