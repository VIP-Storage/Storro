import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, fromEvent, Observable, Subscription} from "rxjs";
import {Stat} from "../../../../data/types";
import {StatsService} from "../../../../api/backend/services/stats.service";
import {distinctUntilChanged, map, tap} from "rxjs/operators";
import {storroAnimations} from "../../../shared/animations";
import {MediaObserver} from '@angular/flex-layout';

@Component({
  selector: 'app-stat-card-grid',
  templateUrl: './stat-card-grid.component.html',
  styleUrls: ['./stat-card-grid.component.scss'],
  animations: storroAnimations
})
export class StatCardGridComponent implements OnInit, OnDestroy {

  cols: number = 1;
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  stats: Observable<Stat[]>;

  private mediaSubscription?: Subscription;


  constructor(private statsService: StatsService,
              private mediaObserver: MediaObserver) {
    this.stats = this.statsService.getDashboardStats().pipe(
      map(res => res.items),
      tap(() => this.isLoading.next(false))
    );
  }


  ngOnInit() {
    this.setSize();
    this.mediaSubscription =   fromEvent(window, 'resize').pipe(
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
    this.cols = ((n % 2 === 0) ? n : n - 1);
  }
}
