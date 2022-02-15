import {Component, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, of, ReplaySubject, Subject, take} from "rxjs";
import {Account, User} from "../../../../../data/types";
import {PageTitleService} from "../../../../../services/page-title.service";
import {catchError, map, shareReplay, takeUntil, tap} from "rxjs/operators";
import {environment} from "../../../../../../environments/environment";
import {ScriptService} from "../../../../../services/script.service";
import {
  EmergencyContactFormComponent,
  MailingAddressFormComponent,
  PersonalInfoFormComponent
} from "../../../../shared/account/components";
import {AccountsService} from "../../../../../api/backend/services/accounts.service";

@Component({
  selector: 'app-client-personal',
  templateUrl: './client-personal.component.html',
  styleUrls: ['./client-personal.component.scss']
})
export class ClientPersonalComponent implements OnDestroy {
  @ViewChild(MailingAddressFormComponent) mailingAddressForm!: MailingAddressFormComponent;
  @ViewChild(PersonalInfoFormComponent) personalInfoForm!: PersonalInfoFormComponent;
  @ViewChild(EmergencyContactFormComponent) emergencyContactForm!: EmergencyContactFormComponent;

  scriptLoaded: boolean = false;
  errorPersonal: string | null = null;
  submittedPersonal: boolean = false;

  errorEmergencyContact: string|null = null;
  submittedEmergencyContact: boolean = false;

  errorMailingAddress: string|null = null;
  submittedMailingAddress: boolean = false;

  account: ReplaySubject<Account> = new ReplaySubject<Account>();
  user: Observable<User>;

  private accountID: string|null = null;
  private googleMapsKey = environment.googleMapsKey;
  private destroyed = new Subject<boolean>();

  constructor(private activatedRoute: ActivatedRoute,
              private scriptService: ScriptService,
              private renderer: Renderer2,
              private accountService: AccountsService,
              private pageTitleService: PageTitleService) {

    const scriptElement = this.scriptService.loadScript(this.renderer, `https://maps.googleapis.com/maps/api/js?libraries=places&key=${this.googleMapsKey}`);

    this.pageTitleService.title = 'Account | Personal';

    this.activatedRoute.data.pipe(
      map(data => data.account),
      tap(account => this.accountID = account.id),
      takeUntil(this.destroyed),
    ).subscribe(account => {
      this.account.next(account);
    });

    this.user = this.account.pipe(
      map(account => account.accountHolder)
    );

    scriptElement.onload = () => {
      this.scriptLoaded = true;
    }

    scriptElement.onerror = () => {
      console.error('Could not load the Google API Script!');
    }
  }

  ngOnDestroy() {
    this.destroyed.next(true);
  }

  updatePersonal() {
   if (!!this.accountID) {
     const personal = this.personalInfoForm.data;
     const request = {
       driversLicense: personal,
       personalPhoneNumber: personal.personalPhoneNumber
     }

     this.submittedPersonal = true;
     this.errorPersonal = null;

     this.accountService.updateAccount(this.accountID, request).pipe(
       catchError(err => {
         this.errorPersonal = err;
         return of(null);
       })
     ).subscribe(accountOrNull => {
       if (!!accountOrNull) {
         this.account.next(accountOrNull);
       }
     })
   }
  }

  updateEmergencyContact() {
    if (!!this.accountID) {
      this.submittedEmergencyContact = true;
      this.errorEmergencyContact = null;

      this.accountService.updateAccount(this.accountID, {
        emergencyContact: this.emergencyContactForm.data,
      }).pipe(
        catchError(err => {
          this.errorEmergencyContact = err;
          return of(null);
        })
      ).subscribe(accountOrNull => {
        if (!!accountOrNull) {
          this.account.next(accountOrNull);
        }
      })
    }
  }

  updateMailingAddress() {
    if (!!this.accountID) {
      this.submittedMailingAddress = true;
      this.errorMailingAddress = null;

      this.accountService.updateAccount(this.accountID, {
        mailingAddress: this.mailingAddressForm.data,
      }).pipe(
        catchError(err => {
          this.errorMailingAddress = err;
          return of(null);
        })
      ).subscribe(accountOrNull => {
        if (!!accountOrNull) {
          this.account.next(accountOrNull);
        }
      })
    }
  }
}
