import { Component, OnInit, Inject} from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  confirmationMessage:string = '';

  constructor(public dialogRef: MatDialogRef<string>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
      this.confirmationMessage = data;
  }

  ngOnInit() {
  }

  yesAction() {
    this.dialogRef.close("yes");
  }

  noAction(): void {
    this.dialogRef.close();
  }

}
