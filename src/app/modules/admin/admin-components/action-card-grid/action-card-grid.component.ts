import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, fromEvent, Subscription} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {storroAnimations} from "../../../shared/animations";

@Component({
  selector: 'app-action-card-grid',
  templateUrl: './action-card-grid.component.html',
  styleUrls: ['./action-card-grid.component.scss'],
  animations: storroAnimations
})
export class ActionCardGridComponent implements OnInit, OnDestroy {

  actions: {
    routerLink?: string,
    title?: string,
    subtitle?: string,
    icon?: string,
    style: 'PURPLE' | 'BLUE' | 'GREEN' | 'RED' | 'ORANGE'
  }[] = [
    {
      routerLink: '/units/adopt',
      title: 'Adopt Unit',
      subtitle: 'Add a new Tibbo device to the system',
      icon: 'add_circle',
      style: 'PURPLE'
    },
    {
      routerLink: '/units/adopt',
      title: 'Create a Keycard',
      subtitle: 'Add a new Tibbo device to the system',
      icon: 'badge',
      style: 'GREEN'
    }
  ]
  cols: number = 1;
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private mediaSubscription?: Subscription;

  constructor() {
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
    let n = Math.ceil(window.innerWidth / 800);
    this.cols = ((n % 2 === 0) ? n : n - 1);
  }

}
