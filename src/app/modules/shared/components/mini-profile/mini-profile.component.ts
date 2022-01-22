import {Component, Input} from '@angular/core';
import {User} from "../../../../data/types";
import {AuthService} from "../../../../api/backend/services/auth.service";
import {Router} from "@angular/router";
import {Role} from "../../../../data/enums";

@Component({
  selector: 'app-mini-profile',
  templateUrl: './mini-profile.component.html',
  styleUrls: ['./mini-profile.component.scss']
})
export class MiniProfileComponent {

  @Input()
  user!: User|null;

  @Input()
  role!: Role|null;

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout();
    return this.router.navigate(['auth', 'login']);
  }
}
