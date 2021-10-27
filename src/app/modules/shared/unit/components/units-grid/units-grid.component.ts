import {BehaviorSubject, Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Component} from "@angular/core";
import {UnitsService} from "../../../../../api/backend/services/units.service";
import {storroAnimations} from "../../../animations";
import {UnitType} from "../../../../../data/types";

@Component({
  selector: 'app-units-grid',
  templateUrl: './units-grid.component.html',
  styleUrls: ['./units-grid.component.scss'],
  animations: storroAnimations
})
export class UnitsGridComponent {

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  units: Observable<UnitType[]>;

  constructor(private unitsService: UnitsService) {
    this.units = this.unitsService.getUnits().pipe(
      tap(() => this.isLoading.next(false))
    );
  }
}
