import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cancelled-parcel',
  templateUrl: './cancelled-parcel.component.html',
  styleUrls: ['./cancelled-parcel.component.scss']
})
export class CancelledParcelComponent implements OnInit {

  cancelleds

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cancelleds = this.route.snapshot.data.parcels
  }

}
