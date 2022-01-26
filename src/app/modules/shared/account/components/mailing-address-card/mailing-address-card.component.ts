import {Component, Input, OnInit} from '@angular/core';
import {MailingAddress} from "../../../../../data/types/accounts";
import {User} from "../../../../../data/types";

@Component({
  selector: 'app-mailing-address-card',
  templateUrl: './mailing-address-card.component.html',
  styleUrls: ['./mailing-address-card.component.scss']
})
export class MailingAddressCardComponent {

  @Input()
  user!: User;

  @Input()
  mailingAddress!: MailingAddress;

}
