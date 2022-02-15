import {Component, Input, OnInit} from '@angular/core';
import {storroAnimations} from "../../../../shared/animations";
import {User} from "../../../../../data/types";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-client-account-grid',
  templateUrl: './client-account-grid.component.html',
  styleUrls: ['./client-account-grid.component.scss'],
  animations: storroAnimations
})
export class ClientAccountGridComponent implements OnInit {

  @Input()
  cols: number = 4;

  @Input()
  user: User|null =  null;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  goToCredentials() {
    return this.router.navigate(['credentials'], {relativeTo: this.activatedRoute});
  }

  goToPersonal() {
    return this.router.navigate(['personal'], {relativeTo: this.activatedRoute});
  }
}
