import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {storroAnimations} from "../../shared/animations";

@Component({
  selector: 'layout-single-card-page',
  templateUrl: './single-card-page.component.html',
  styleUrls: ['./single-card-page.component.scss'],
  animations: storroAnimations
})
export class SingleCardPageComponent {

  @Input()
  title?: string;

  @Input()
  subtitle?: string;

  @Input()
  backRouterLink?: string;

  @Input()
  showAddButton = false;

  @Input()
  addButtonTooltip?: string|null = null;

  @Input()
  fullWidth: boolean = false;

  @Input()
  showHeader: boolean = true;

  @Input()
  set fullScrollHeight(newValue: boolean | string) {
    if (typeof newValue === 'boolean') {
      this.scrollHeight = (newValue as boolean);
    } else {
      this.scrollHeight = (newValue === 'true');
    }
  }

  @Input()
  set showDivider(newValue: boolean | string) {
    if (typeof newValue === "boolean") {
      this.dividerEnabled = (newValue as boolean)
    } else {
      this.dividerEnabled = (newValue === 'true');
    }
  }

  @Input()
  set stepperForm(newValue: boolean | string) {
    if (typeof newValue === "boolean") {
      this.stepperMode = (newValue as boolean)
    } else {
      this.stepperMode = (newValue === 'true');
    }
  }

  @Output()
  addClicked = new EventEmitter<any>();

  dividerEnabled: boolean = true;
  stepperMode: boolean = false;
  scrollHeight: boolean = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }


  goBack() {
    if (!!this.backRouterLink) {
      if (this.backRouterLink === '../') {
        return this.router.navigate(['../'], {relativeTo: this.activatedRoute})
      }
      return this.router.navigate(this.backRouterLink.split('/'), {relativeTo: this.activatedRoute})
    }


    return null;
  }
}
