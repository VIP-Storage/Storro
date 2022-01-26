import {Component, Input} from '@angular/core';
import {User} from "../../../../data/types";
import {AuthService} from "../../../../api/backend/services/auth.service";
import {Router} from "@angular/router";
import {Role} from "../../../../data/enums";
import {EntityHelper} from "../../helpers/entity.helper";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ThemeService} from "../../../../services/theme.service";

@Component({
  selector: 'app-mini-profile',
  templateUrl: './mini-profile.component.html',
  styleUrls: ['./mini-profile.component.scss']
})
export class MiniProfileComponent {

  @Input()
  user!: User | null;

  @Input()
  role!: Role | null;

  isDarkMode: Observable<boolean>;

  constructor(private authService: AuthService, public themeService: ThemeService, private router: Router) {
    this.isDarkMode = this.themeService.theme.pipe(
      map(theme => theme === 'dark-theme')
    );
  }

  logout() {
    this.authService.logout();
    return this.router.navigate(['auth', 'login']);
  }

  fullName(user: User) {
    return EntityHelper.fullName(user);
  }

  initials(user: User) {
    return EntityHelper.initials(user);
  }

  updateTheme(darkMode: boolean) {
    this.themeService.changeTheme(darkMode);
  }
}
