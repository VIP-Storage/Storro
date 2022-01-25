import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../../../data/enums";
import {AuthMessageService} from "../../../../services/auth-message.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {User} from "../../../../data/types";
import {UserService} from "../../../../api/backend/services/user.service";

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {


  submitted = false;
  error: string | null = null;

  email = new FormControl('', [Validators.required, Validators.email]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  role = new FormControl('', [Validators.required]);
  validated = new FormControl('');

  createForm: FormGroup = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    role: this.role,
    validated: this.validated
  });

  roles: Role[] = Object.values(Role) as unknown as Role[];

  static panelClass = 'edit-user-dialog';

  constructor(private authMessageService: AuthMessageService,
              private userService: UserService,
              private matDialogRef: MatDialogRef<EditUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public incomingUser: User) {

    this.userService.currentUser.subscribe(user => {
      if (user.id === incomingUser.id) {
        this.role.disable();
      }
    })
  }

  ngOnInit() {
    this.email.setValue(this.incomingUser.email);
    this.email.disable();

    this.firstName.setValue(this.incomingUser.firstName);
    this.lastName.setValue(this.incomingUser.lastName);
    this.role.setValue(this.incomingUser.role);
    this.validated.setValue(this.incomingUser.emailValidated);
  }

  getErrorMessage(formControl: FormControl) {
    if (!formControl) {
      console.warn(`FormControl '${name}' is null or undefined`);
      return '';
    }

    if (formControl.hasError('email')) {
      return `'${formControl.value}' is not a valid email address`;
    } else if (formControl.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  updateUser() {
    this.submitted = true;

    this.incomingUser.email = this.email.value;
    this.incomingUser.firstName = this.firstName.value;
    this.incomingUser.lastName = this.lastName.value;
    this.incomingUser.role = this.role.value;
    this.incomingUser.emailValidated = this.validated.value;

    this.userService.update(this.incomingUser).pipe(
      catchError(err => {
        this.error = err;
        this.submitted = false;

        return of(null);
      })
    ).subscribe(res => {
      if (!!res && res.success) {
        this.matDialogRef.close(res);
      } else if (!!res) {
        this.submitted = false;
        this.error = this.authMessageService.getErrorMessage(res);
      }
    })
  }

}