import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PageTitleService} from "../../../../../services/page-title.service";
import {AlertService} from "../../../../../services/alert.service";

@Component({
  selector: 'app-client-password-change',
  templateUrl: './client-password-change.component.html',
  styleUrls: ['./client-password-change.component.scss']
})
export class ClientPasswordChangeComponent {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private pageTitleService: PageTitleService,
              private alertService: AlertService) {
    this.pageTitleService.title = 'Change Password';
  }

  done() {
    this.alertService.setCurrentAlert({
      type: 'success',
      message: 'Successfully changed password'
    });

    return this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

}
