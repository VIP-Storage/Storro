import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {fromEvent, Subscription} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {storroAnimations} from "../../shared/animations";

@Component({
  selector: 'layout-card-grid-page',
  templateUrl: './card-grid-page.component.html',
  styleUrls: ['./card-grid-page.component.scss'],
  animations: storroAnimations
})
export class CardGridPageComponent implements OnInit, OnDestroy {

  @Input()
  title?: string;

  @Input()
  subtitle?: string;

  @Input()
  backRouterLink?: string;

  columnsDisplayed: number = 1;

  private mediaSubscription?: Subscription;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.setSize();
    this.mediaSubscription = fromEvent(window, 'resize').pipe(
      distinctUntilChanged()
    ).subscribe(() => {
      this.setSize();
    });
  }

  ngOnDestroy() {
    if (this.mediaSubscription) {
      this.mediaSubscription.unsubscribe();
    }
  }

  private setSize() {
    let n = Math.ceil(window.innerWidth / 400);
    this.columnsDisplayed = ((n % 2 === 0) ? n : n - 1);
  }


  goBack() {
    if (!!this.backRouterLink) {
      if (this.backRouterLink === '../') {
        return this.router.navigate(['../'], {relativeTo: this.activatedRoute})
      }
      return this.router.navigate(this.backRouterLink.split('/'), {relativeTo: this.activatedRoute})
    }

    return null;
  }
}
