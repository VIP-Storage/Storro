import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Stat} from "../../../../data/types";
import {StatsService} from "../../../../api/backend/services/stats.service";
import {map, tap} from "rxjs/operators";
import {storroAnimations} from "../../../shared/animations";

@Component({
  selector: 'app-stat-card-grid',
  templateUrl: './stat-card-grid.component.html',
  styleUrls: ['./stat-card-grid.component.scss'],
  animations: storroAnimations
})
export class StatCardGridComponent implements OnInit {

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  stats: Observable<Stat[]>;

  constructor(private statsService: StatsService) {
    this.stats = this.statsService.getDashboardStats().pipe(
      map(res => res.items),
      tap(() => this.isLoading.next(false))
    );
  }

  ngOnInit(): void {
  }

}
