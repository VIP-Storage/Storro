import {Component, OnInit} from '@angular/core';
import {PageTitleService} from "../../../../services/page-title.service";
import {storroAnimations} from "../../../shared/animations";

@Component({
  selector: 'app-client-billing',
  templateUrl: './client-billing.component.html',
  styleUrls: ['./client-billing.component.scss'],
  animations: storroAnimations
})
export class ClientBillingComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) {
  }

  ngOnInit(): void {
    this.pageTitleService.title = 'Billing';
  }

}