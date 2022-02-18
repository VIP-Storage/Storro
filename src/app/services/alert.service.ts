import {Injectable} from '@angular/core';
import {BehaviorSubject, from, of, Subject} from 'rxjs';
import {concatMap, delay, takeUntil} from 'rxjs/operators';
import {Alert} from "../data";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private _currentAlert = new BehaviorSubject<Alert|null>(null);
  private _unsubscribeAll: Subject<boolean>;
  private _showDuration = 1000;
  private _alertQueue: Alert[] = [];
  private _isDisplayingAlert = false;

  constructor() {
    this._unsubscribeAll = new Subject();
  }

  public static getAlertIcon(alert: Alert) {
    switch (alert.type) {
      case 'info':
      default:
        return 'info';
      case 'warning':
        return 'warning';
      case 'danger':
        return 'error ';
      case 'success':
        return 'done';
    }
  }

  getCurrentAlert() {
    return this._currentAlert.asObservable();
  }

  /**
   * Set the current alert
   *
   * @param alert {Alert}
   * @param duration - Length of time to display alert in MS
   * @param now
   */
  setCurrentAlert(alert: Alert|undefined, duration: number|null = null, now: boolean = false) {
    if (alert === undefined) {
      return;
    }

    if (now) {
      return this.displayAlert(alert, (!!duration ? duration : this._showDuration));
    }

    // Check if the alert is null so we can tell our listeners to stop displaying the alert
    if (alert == null) {
      this._currentAlert.next(alert);
      return;
    } else if (this._isDisplayingAlert) {
      // Otherwise, if we're already displaying an alert, go ahead and add it to the queue
      this._alertQueue.push(alert);
      return;
    }

    this.displayAlert(alert, (!!duration ? duration : this._showDuration));
  }

  public clearAlert() {
    this._isDisplayingAlert = false;
  }

  // This looks scary, but its pretty simple
  private displayAlert(alert: Alert, duration: number) {

    // First, set isDisplayingAlert to true so any additional alerts get enqueued
    this._isDisplayingAlert = true;

    // Reset the unsubscribeAll subject by making a new one
    this._unsubscribeAll = new Subject();

    // Notify listeners that the alert div needs to be displayed
    this._currentAlert.next(alert);

    // And here's the magic sauce. First, create a range from 0 to whatever the show duration is
    from(this.range(duration).reverse()).pipe(
      // Make a delayed pipe of 1ms
      concatMap(v => of(v).pipe(delay(1))),

      // Take until we say to stop (setting unsubscribeAll to true)
      takeUntil(this._unsubscribeAll)
    ).subscribe(val => {
      // Calculate the percentage value (BASIC MATH)
      const percentValue = (val / this._showDuration) * 100;

      // Check if we're at the end of the progress
      if (percentValue <= 1) {
        // Tell our range pipe to stop emitting
        this._unsubscribeAll.next(true);

        // Tell our listeners to hide the alert div
        this._currentAlert.next(null);

        // Check if our alert queue is empty or not
        if (this._alertQueue.length > 0) {
          // Hey, we have an alert, set the next alert 1 second from now for better UI
          setTimeout(() => this.setCurrentAlert(this._alertQueue.pop()), 1000);
        }

        // Declare we currently aren't displaying anything
        this._isDisplayingAlert = false;
      }
    });
  }

  private range = (n: number) => Array.from({length: n}, (value, key) => key);
}
