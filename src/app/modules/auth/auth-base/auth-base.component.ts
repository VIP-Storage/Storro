import {Component} from '@angular/core';
import {AuthFrontendService} from "../services/auth-frontend.service";
import {Observable} from "rxjs";
import {routeAuthTransitionAnimations} from "./auth-base.animations";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-auth-base',
  templateUrl: './auth-base.component.html',
  styleUrls: ['./auth-base.component.scss'],
  animations: [routeAuthTransitionAnimations]
})
export class AuthBaseComponent {

  title: Observable<string>;
  showLoginBackButton: Observable<boolean>;

  constructor(private authFrontendService: AuthFrontendService) {
    this.title = authFrontendService.currentTitle;
    this.showLoginBackButton = authFrontendService.showLoginBackButton;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState'];
  }
}
