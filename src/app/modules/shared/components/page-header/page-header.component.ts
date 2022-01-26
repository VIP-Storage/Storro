import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {storroAnimations} from "../../animations";
import {PageHeaderAction} from "./page-header.action";

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  animations: storroAnimations
})
export class PageHeaderComponent {


  @Input()
  title!: string;

  @Input()
  icon?: string;

  @Input()
  search: boolean = true;

  @Output()
  searchValueChanged = new EventEmitter<string | null>();

  @Input()
  actions: PageHeaderAction[] = [];

  @Input()
  showBackButton: boolean = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  actionClicked(action: PageHeaderAction) {
    if (action.routerLink) {
      this.router.navigate([action.routerLink], {relativeTo: this.activatedRoute}).then();
    } else if (action.clickAction) {
      action.clickAction();
    }
  }

}
