import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {KeycardsService} from "../../../../api/backend/services/keycards.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-request-key-card',
  templateUrl: './request-key-card.component.html',
  styleUrls: ['./request-key-card.component.scss']
})
export class RequestKeyCardComponent implements OnInit {
  requestFormGroup: FormGroup;

  cardName = new FormControl('', [Validators.required]);
  requestComments = new FormControl('');

  requested: boolean = false;
  error: string | null = null;
  static panelClass = 'request-key-card-dialog';

  constructor(private keycardsService: KeycardsService,
              private dialogRef: MatDialogRef<RequestKeyCardComponent>) {
    this.requestFormGroup = new FormGroup({
      cardName: this.cardName,
      requestComments: this.requestComments
    });
  }

  ngOnInit(): void {
  }

  get submitDisabled() {
    return this.cardName.invalid || this.requestComments.invalid;
  }


  submitRequest() {
    this.requested = true;

    this.keycardsService.requestKeycard(this.cardName.value, this.requestComments.value).subscribe(response => {
      this.requested = false;

      if (response.success) {
        this.dialogRef.close(response.data);
      } else {
        this.error = response.message;
      }

    });
  }

}
