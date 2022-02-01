import {Component, OnInit} from '@angular/core';
import {storroAnimations} from "../../../../shared/animations";

@Component({
  selector: 'app-client-account',
  templateUrl: './client-account.component.html',
  styleUrls: ['./client-account.component.scss'],
  animations: storroAnimations
})
export class ClientAccountComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
