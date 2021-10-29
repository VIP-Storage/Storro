import {Component, HostBinding, Input} from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {filter, switchMap, tap} from "rxjs/operators";
import {UnitsService} from "../../../../../api/backend/services/units.service";
import {UnitAccessEntryType, UnitType} from "../../../../../data/types";
import {storroAnimations} from "../../../animations";

@Component({
  selector: 'app-access-history-card',
  templateUrl: './access-history-card.component.html',
  styleUrls: ['./access-history-card.component.scss'],
  animations: storroAnimations
})
export class AccessHistoryCardComponent {

  @Input() set unit(newValue: UnitType) {
    if (!!newValue) {
      this.$currentUnit.next(newValue);
      console.log('Set unit', newValue);
    }
  }

  isLoading = true;
  $currentUnit: ReplaySubject<UnitType> = new ReplaySubject<UnitType>();
  $accessHistory: Observable<UnitAccessEntryType[]>;


  constructor(private unitsService: UnitsService) {
    this.$accessHistory = this.$currentUnit.pipe(
      filter(u => !!u),
      switchMap(unit => this.unitsService.getUnitAccessHistory(unit)),
      tap((access) => {
        this.isLoading = false;
        console.log('done', access);
      })
    );
  }

}
