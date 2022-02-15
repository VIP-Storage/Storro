import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, fromEvent, Observable, Subscription} from "rxjs";
import {Stat} from "../../../../data/types";
import {StatsService} from "../../../../api/backend/services/stats.service";
import {distinctUntilChanged, map, tap} from "rxjs/operators";
import {storroAnimations} from "../../../shared/animations";

@Component({
  selector: 'app-stat-card-grid',
  templateUrl: './stat-card-grid.component.html',
  styleUrls: ['./stat-card-grid.component.scss'],
  animations: storroAnimations
})
export class StatCardGridComponent implements OnInit, OnDestroy {

  cols: number = 1;
  totalStats: number = 1;
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  stats: Observable<Stat[]>;

  private mediaSubscription?: Subscription;


  constructor(private statsService: StatsService) {
    this.stats = this.statsService.getDashboardStats().pipe(
      tap(res => this.totalStats = res.items.length),
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

  get minHeight() {
    return `${(this.cols/this.totalStats) * 385}px`;
  }

  private setSize() {
    if (window.innerWidth <= 1650 && window.innerWidth >= 1300) {
      this.cols = 3;
    } else if ( window.innerWidth < 1300) {
      this.cols = 2;
    } else {
      let n = Math.ceil(window.innerWidth / 400);
      this.cols = ((n % 2 === 0) ? n : n - 1);
    }
  }
}
