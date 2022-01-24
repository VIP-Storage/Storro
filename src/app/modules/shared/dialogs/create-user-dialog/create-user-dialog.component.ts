import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../api/backend/services/auth.service";
import {Role} from "../../../../data/enums";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthMessageService} from "../../../../services/auth-message.service";

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss']
})
export class CreateUserDialogComponent implements OnInit {

  submitted = false;
  error: string | null = null;

  email = new FormControl('', [Validators.required, Validators.email]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  role = new FormControl('', [Validators.required]);

  createForm: FormGroup = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    role: this.role
  });

  roles: Role[] = Object.values(Role) as unknown as Role[];

  static panelClass = 'create-user-dialog';

  constructor(private authService: AuthService,
              private authMessageService: AuthMessageService,
              private matDialogRef: MatDialogRef<CreateUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public configuredRole: Role | null) {
  }

  ngOnInit() {
    if (!!this.configuredRole) {
      this.role.setValue(this.configuredRole);
    }
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

  createUser() {
    this.submitted = true;

    this.authService.create(
      this.email.value,
      this.firstName.value,
      this.lastName.value,
      this.role.value
    ).pipe(
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
