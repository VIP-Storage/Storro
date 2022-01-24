import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DebugDialogComponent} from "../modules/shared/dialogs/debug-dialog/debug-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DebugDialogService {

  private currentDialog: MatDialogRef<any>|null = null;

  constructor(private matDialog: MatDialog) {
  }

  openDebugDialog(title: string, object: object) {
    this.currentDialog = this.matDialog.open(DebugDialogComponent, {
      data: {
        title,
        object
      },
      panelClass: 'debug-dialog'
    })
  }

  closeDebugDialog() {
    if (this.currentDialog) {
      this.currentDialog.close();
    }
  }
}
