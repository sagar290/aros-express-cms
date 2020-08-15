import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DateSelectorComponent>
  ) { }

  ngOnInit(): void {
  }

  inlineDate: { chosenLabel: string; startDate: moment.Moment; endDate: moment.Moment };

  selected = {
    startDate: moment('2020-06-18T00:00Z'),
    endDate: moment('2020-06-26T00:00Z'),
  };

  chosenDate(chosenDate: { chosenLabel: string; startDate: moment.Moment; endDate: moment.Moment }): void {
    console.log(chosenDate);
    this.inlineDate = chosenDate;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
