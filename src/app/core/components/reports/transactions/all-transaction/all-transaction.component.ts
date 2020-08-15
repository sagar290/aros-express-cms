import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateSelectorComponent } from '@app/shared/components/date-selector/date-selector.component';
import { ApiService } from '@app/core/http/api.service';
import { CommonService } from '@app/shared/services/common.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-all-transaction',
  templateUrl: './all-transaction.component.html',
  styleUrls: ['./all-transaction.component.scss']
})
export class AllTransactionComponent implements OnInit {

  info
  details
  chart
  today = new Date()
  selectedDate = {
    start: null,
    end: null
  }
  compareDate = {
    start: null,
    end: null
  }

  constructor(
    public dialog: MatDialog,
    public api: ApiService,
    public common: CommonService
  ) { }

  ngOnInit(): void {
    this.onDateChange('2020-08-05', this.today)
  }

  onStartDateChange(e) {
    this.selectedDate.start = e
  }

  onCompareStartDateChange(e) {
    this.compareDate.start = this.common.getDate(e)
  }

  onEndDateChange(e) {
    if (e) this.onDateChange(this.selectedDate.start, e)
  }

  onCompareEndDateChange(e) {
    if (e) {
      this.chart.destroy()
      this.chart = null
      this.compareDate.end = this.common.getDate(e)
      this.onCompareDateChange(this.selectedDate, this.compareDate)
    }
  }

  onCompareDateChange(initial_range: any, final_range: any) {
    let comparingData = {
      first_series: null,
      second_series: null
    }
    this.api.getTransactionsByDateRange(initial_range.start, initial_range.end).subscribe(data => comparingData.first_series = data)
    this.api.getTransactionsByDateRange(final_range.start, final_range.end).subscribe(data => { comparingData.second_series = data }, (e) => { }, () => {
      setTimeout(() => {
        this.generateComparingChart(comparingData)
      }, 500);
    })
  }

  generateComparingChart(data) {
    this.chart = new Chart('chart', {
      type: 'line',
      data: {
        labels: data.first_series.length > data.second_series.length ? data.first_series.map((x, i) => `Day ${i + 1}`) : data.second_series.map((x, i) => `Day ${i + 1}`),
        datasets: [
          {
            data: data.first_series.map(x => x.total),
            borderColor: "blue",
            backgroundColor: "lightblue",
            borderWidth: 1
          },
          {
            data: data.second_series.map(x => x.total),
            borderColor: "green",
            backgroundColor: "lightgreen",
            borderWidth: 1
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        },
        tooltips: {
          callbacks: {
            label: function (ttitem, data) {
              return ttitem.xLabel + ": " + ttitem.yLabel
            }
          }
        }
      }
    })
    console.log(this.chart);

  }


  onDateChange(start, end) {
    if (start && end) {
      this.chart ? this.chart.destroy() : this.chart = null
      this.chart = null
      this.selectedDate.start = this.common.getDate(start)
      this.selectedDate.end = this.common.getDate(end)
      this.selectedDate.start === this.selectedDate.end ? this.onSpecificDateSelect(this.selectedDate.start) : this.onDateRangeSelect(this.selectedDate.start, this.selectedDate.end)
    }
  }
  onSpecificDateSelect(date) {
    this.getDateWiseData(date)
    this.getDateWiseInfo(date)
    this.getDateWiseDetails(date)
  }
  onDateRangeSelect(start, end) {
    this.getDateRangeData(start, end)
    this.getDateRangeInfo(start, end)
    this.getDateRangeDetails(start, end)
  }
  getDetails(query) {
    this.selectedDate.start === this.selectedDate.end ? this.getDateWiseDetails(this.selectedDate.start, query) : this.getDateRangeDetails(this.selectedDate.start, this.selectedDate.end, query)
  }
  getDateRangeData(start, end) {
    this.api.getTransactionsByDateRange(start, end).subscribe(data => {
      this.generateDateRangeChart(data)
    })
  }
  getDateRangeInfo(start, end) {
    this.api.getTransactionInfoByDateRange(start, end).subscribe(data => this.info = data)
  }
  getDateRangeDetails(start, end, query = {}) {
    this.api.getTransactionDetailsByDateRange(start, end, query).subscribe(data => this.details = data)
  }

  getDateWiseData(date) {
    this.api.getTransactionByDate(date).subscribe(data => {
      this.generateDayWiseChart(data)
    })
  }
  getDateWiseInfo(date) {
    this.api.getTransactionInfoByDate(date).subscribe(data => this.info = data)
  }
  getDateWiseDetails(date, query = {}) {
    this.api.getTransactionDetailesByDate(date, query).subscribe(data => this.details = data)
  }

  getDateOfDetails(date) {
    return date.split(' ')[0]
  }

  getCustomerInfo(customer_info, key) {
    return JSON.parse(customer_info)[key]
  }

  generateDateRangeChart(data) {
    this.chart = new Chart('chart', {
      type: 'line',
      data: {
        labels: data.map(x => x.date),
        datasets: [
          {
            data: data.map(x => x.total),
            borderColor: "blue",
            backgroundColor: "lightblue",
            borderWidth: 1
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    })
  }

  generateDayWiseChart(data) {
    this.chart = new Chart('chart', {
      type: 'line',
      data: {
        labels: data.map(x => `${x.Hour}:00`),
        datasets: [
          {
            data: data.map(x => x.total),
            borderColor: "blue",
            backgroundColor: "lightblue",
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    })
  }




  openDialog(): void {
    const dialogRef = this.dialog.open(DateSelectorComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
