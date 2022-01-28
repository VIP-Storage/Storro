import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {StateHelper} from "../../../shared/helpers/state.helper";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {storroAnimations} from "../../../shared/animations";
import {PageTitleService} from "../../../../services/page-title.service";
import {UserService} from "../../../../api/backend/services/user.service";
import {fromEvent, Observable} from "rxjs";
import {User} from "../../../../data/types";
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from "rxjs/operators";
import {MatSelectionListChange} from "@angular/material/list";
import {KeycardsService} from "../../../../api/backend/services/keycards.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-create-keycard',
  templateUrl: './admin-create-keycard.component.html',
  styleUrls: ['./admin-create-keycard.component.scss'],
  animations: storroAnimations
})
export class AdminCreateKeycardComponent implements AfterViewInit {

  @ViewChild('userSearch') userSearchInput!: ElementRef;

  error: string | null = null;
  submitted: boolean = false;
  allStates = StateHelper.states;
  userFormGroup: FormGroup;
  keyCardInfoFormGroup: FormGroup;

  // userFormGroup
  user = new FormControl('', [Validators.required]);
  users!: Observable<User[]>;
  totalTenants: number = 0;

  // keyCardInfoFormGroup
  facilityCode = new FormControl('', [Validators.required, Validators.minLength(4)]);
  cardCode = new FormControl('', [Validators.required, Validators.minLength(8)]);
  cardName = new FormControl('',);

  constructor(private pageTitleService: PageTitleService,
              private keycardsService: KeycardsService,
              private router: Router,
              private userService: UserService) {
    this.pageTitleService.title = 'New Key Card';

    this.userFormGroup = new FormGroup({
      user: this.user
    });

    this.keyCardInfoFormGroup = new FormGroup({
      facilityCode: this.facilityCode,
      cardCode: this.cardCode,
      cardName: this.cardName
    });

  }

  ngAfterViewInit() {
    this.users = fromEvent(this.userSearchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged(),
        switchMap(() => {
          return this.userService.getTenants(0, 10, 'firstName', 'DESC', `${this.userSearchInput.nativeElement.value}`)
        }),
        map(response => {
          this.totalTenants = response.meta.totalItems;

          return response.items;
        })
      )
  }

  getErrorMessage(formControl: FormControl, displayLabel?: string) {
    if (!formControl) {
      console.warn(`FormControl '${name}' is null or undefined`);
      return '';
    }

    const label = (displayLabel ? displayLabel : 'value');

    if (formControl.hasError('required')) {
      return `You must enter a ${label}`;
    } else if (formControl.hasError('minlength')) {
      return `'${formControl.value}' is too short of a ${label}`;
    } else if (formControl.hasError('mask')) {
      const requiredValue = formControl.getError('mask').requiredMask;

      return `'${formControl.value}' is not a valid ${label}, must be in format ${requiredValue}`;
    }

    return '';
  }

  userSelectionChange(selection: MatSelectionListChange) {
    this.user.setValue(selection.options[0].value);
  }

  isSelected(entity: User) {
    return this.user.value === entity.id;
  }

  createKeycard() {
    this.error = null;
    this.submitted = true;

    this.keycardsService.createKeycard(this.cardCode.value, this.facilityCode.value, this.user.value, this.cardName.value).subscribe(res => {
      if (!res.success) {
        this.error = res.message;
        this.submitted = false;
      } else {
        this.router.navigate(['admin', 'keycards']).then();
      }
    })
  }

  get saveDisabled() {
    return this.cardCode.invalid || this.facilityCode.invalid || this.submitted;
  }

}
