import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../components/confirm-dialog.component'
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    public dialog: MatDialog
  ) { }

  get confirm(): Observable<any> {
    const message = 'Are you sure you want to do this?';
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { minWidth: '300px', maxWidth: '500px', data: dialogData });
    return dialogRef.afterClosed()
  }

  public getDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }
}
