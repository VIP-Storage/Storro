import {Component} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';
import {Alert} from "../../../../data";
import {AlertService} from "../../../../services/alert.service";

@Component({
  selector: 'app-alert-wrapper',
  templateUrl: './alert-wrapper.component.html',
  styleUrls: ['./alert-wrapper.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({top: '-5em', opacity: 0}),
            animate('300ms ease-out',
              style({top: '0', opacity: 1}))
          ]
        ),
        transition(
          ':leave',
          [
            style({top: '0', opacity: 1}),
            animate('300ms ease-in',
              style({top: '-5em', opacity: 0}))
          ]
        )
      ]
    )
  ]
})
export class AlertWrapperComponent {

  currentAlert: Observable<Alert|null>;

  // Private
  private readonly unsubscribeAll: Subject<any>;

  constructor(private alertService: AlertService,
              private router: Router) {
    // Set the private defaults
    this.unsubscribeAll = new Subject();

    this.currentAlert = this.alertService.getCurrentAlert().pipe(
      takeUntil(this.unsubscribeAll)
    );
  }


  goToRouterURL(url: string) {
    this.router.navigateByUrl(url).then();
  }

  closeAlert() {
    this.alertService.setCurrentAlert(undefined);
  }

  getAlertIcon(alert: Alert) {
    return AlertService.getAlertIcon(alert);
  }
}
