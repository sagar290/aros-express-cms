import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  template: `

  <div class="example-dialog-content" cdkDrag cdkDragRootElement=".cdk-overlay-pane" cdkDragBoundary=".example-boundary">

  <h1 mat-dialog-title>
        {{title}}
        </h1>

        <div mat-dialog-content style="overflow: unset;">
        <span [innerHTML]="message"></span>
        </div>

        <div mat-dialog-actions align="end" class="buttons mt-2" style="padding: 1rem 0 0">
          <button class="button is-white" (click)="onDismiss()">No</button>
          <button class="button is-success" (click)="onConfirm()">Yes</button>
        </div>

  </div>

    `
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit(): void {
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {

  constructor(public title: string, public message: string) {
  }
}
