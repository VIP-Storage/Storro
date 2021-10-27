import { Component, OnInit } from '@angular/core';
import {UnitsService} from "../../../../api/backend/services/units.service";
import {BehaviorSubject, Observable} from "rxjs";
import {UnitType} from "../../../../data/types/unit.type";
import {tap} from "rxjs/operators";
import {storroAnimations} from "../../animations";

@Component({
  selector: 'app-units-grid',
  templateUrl: './units-grid.component.html',
  styleUrls: ['./units-grid.component.scss'],
  animations: storroAnimations
})
export class UnitsGridComponent implements OnInit {

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  units: Observable<UnitType[]>;

  constructor(private unitsService: UnitsService) {
    this.units = this.unitsService.getUnits().pipe(
      tap(() => this.isLoading.next(false))
    );
  }

  ngOnInit(): void {
  }

}
