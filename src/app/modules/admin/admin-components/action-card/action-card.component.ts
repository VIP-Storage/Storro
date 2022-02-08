import {Component, HostListener, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss']
})
export class ActionCardComponent {

  @Input()
  title?: string;

  @Input()
  subtitle?: string;

  @Input()
  routerLink?: string;

  @Input()
  style: 'PURPLE' | 'BLUE' | 'GREEN' | 'RED' | 'ORANGE' = 'PURPLE';

  @Input()
  icon?: string;

  @HostListener('click')
  clicked() {
    if (!!this.routerLink) {
      return this.router.navigate(this.routerLink.split('/'), {relativeTo: this.activatedRoute})
    }

    return null;
  }

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  get backgroundOverlayClass() {
    return `${this.style.toLowerCase()}-background`;
  }

}
