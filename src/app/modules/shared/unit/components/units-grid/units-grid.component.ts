import {BehaviorSubject, Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {UnitsService} from "../../../../../api/backend/services/units.service";
import {storroAnimations} from "../../../animations";
import {Unit} from "../../../../../data/types";
import {UserService} from "../../../../../api/backend/services/user.service";
import {Role} from "../../../../../data/enums";

@Component({
  selector: 'app-units-grid',
  templateUrl: './units-grid.component.html',
  styleUrls: ['./units-grid.component.scss'],
  animations: storroAnimations
})
export class UnitsGridComponent {

  @Output()
  action: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  actionButtonTitle: string|null = null;

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  units!: Observable<Unit[]>;
  clientMode: boolean = false;
  totalUnits: number = 0;

  constructor(private unitsService: UnitsService,
              private userService: UserService) {

    this.userService.currentRole.pipe(
      map(role => role === Role.Tenant)
    ).subscribe(clientMode => this.clientMode = clientMode);

    this.reloadData();
  }

  public reloadData() {
    this.units = this.unitsService.getUnits().pipe(
      tap(() => this.isLoading.next(false)),
      tap(response => this.totalUnits = response.meta.totalItems),
      map(response => response.items)
    );
  }
}
