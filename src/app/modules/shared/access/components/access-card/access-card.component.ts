import {Component, HostBinding, Input} from '@angular/core';
import {Unit, User} from "../../../../../data/types";
import {UserService} from "../../../../../api/backend/services/user.service";
import {BehaviorSubject} from "rxjs";
import {storroAnimations} from "../../../animations";

@Component({
  selector: 'app-access-card',
  templateUrl: './access-card.component.html',
  styleUrls: ['./access-card.component.scss'],
  animations: storroAnimations
})
export class AccessCardComponent {

  @Input()
  @HostBinding('class.show-borders')
  showBorders: boolean = false;

  userAccessCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  @Input()
  @HostBinding('class.show-background')
  showBackground: boolean = true;

  @Input()
  set unit(unit: Unit|null) {
    if (!!unit) {
      this._unit = unit;
      this.fetchUsers();
    }
  }

  users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  private _unit?: Unit;

  constructor(private userService: UserService) { }

  private fetchUsers() {
    if (!!this._unit) {

    }
  }

}
