import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {UnitType, User} from "../../../../../data/types";
import {UserService} from "../../../../../api/backend/services/user.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-access-card',
  templateUrl: './access-card.component.html',
  styleUrls: ['./access-card.component.scss']
})
export class AccessCardComponent implements OnInit {

  @Input()
  @HostBinding('class.show-borders')
  showBorders: boolean = false;

  userAccessCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  @Input()
  @HostBinding('class.show-background')
  showBackground: boolean = true;

  @Input()
  set unit(unit: UnitType|null) {
    if (!!unit) {
      this._unit = unit;
      this.fetchUsers();
    }
  }

  users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  private _unit?: UnitType;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  private fetchUsers() {
    if (!!this._unit) {
      this.userService.getUsersAssociated(this._unit!, 3).subscribe(this.users);
      this.userService.countUsersAssociated(this._unit!).subscribe(this.userAccessCount);
    }
  }

}
