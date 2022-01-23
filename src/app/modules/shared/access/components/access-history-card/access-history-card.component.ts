import {Component, HostBinding, Input} from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {filter, switchMap, tap} from "rxjs/operators";
import {UnitsService} from "../../../../../api/backend/services/units.service";
import {UnitAccessEntryType, Unit} from "../../../../../data/types";
import {storroAnimations} from "../../../animations";

@Component({
  selector: 'app-access-history-card',
  templateUrl: './access-history-card.component.html',
  styleUrls: ['./access-history-card.component.scss'],
  animations: storroAnimations
})
export class AccessHistoryCardComponent {

  @Input() set unit(newValue: Unit) {
    if (!!newValue) {
      this.$currentUnit.next(newValue);
    }
  }

  isLoading = true;
  $currentUnit: ReplaySubject<Unit> = new ReplaySubject<Unit>();
  $accessHistory: Observable<UnitAccessEntryType[]>;


  constructor(private unitsService: UnitsService) {
    this.$accessHistory = this.$currentUnit.pipe(
      filter(u => !!u),
      switchMap(unit => this.unitsService.getUnitAccessHistory(unit)),
      tap(() => this.isLoading = false)
    );
  }

}
