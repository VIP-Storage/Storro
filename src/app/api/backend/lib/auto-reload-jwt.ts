import { MonoTypeOperatorFunction, BehaviorSubject, Observable } from 'rxjs';
import { switchMapTo, tap, shareReplay } from 'rxjs/operators';
import JwtDecode from 'jwt-decode';

/**
 * Replays a JWT observable stream. If the JWT's exp passes then the source observable
 * will be re triggered automatically to get a new token.
 * This replays last value so the token will only update when it expires or because of an
 * upstream event, regardless of new subscriptions. Look up shareReplay() for more details.
 * @requires exp Token's must contain a exp to be used with this.
 */
export default function autoReloadJwt(): MonoTypeOperatorFunction<string> {
  return (input$): Observable<string> => {
    // subject which we call next on to trigger source observable which requests a token from api
    // behaviour subjects always have a value so it will emit immidiately when subscribed to.
    const refreshSubject = new BehaviorSubject<void>(undefined);

    let timeout: number;
    return refreshSubject.pipe(
      switchMapTo(input$),
      tap(jwt => {
        if (jwt && jwt.length > 0) {
          // clear old timeout incase new token was not the rsult of the timeout
          clearTimeout(timeout);
          // set timeout to trigger refresh subject when token expires
          const { exp } = JwtDecode<{ exp: number }>(jwt);
          timeout = window.setTimeout(() => {
            refreshSubject.next();
          }, exp * 1000 - new Date().getTime());
        }
      }),
      shareReplay(1)
    );
  };
}
