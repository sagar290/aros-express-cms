import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/core/http/api.service';

@Component({
  selector: 'app-cancelled-parcel',
  templateUrl: './cancelled-parcel.component.html',
  styleUrls: ['./cancelled-parcel.component.scss']
})
export class CancelledParcelComponent implements OnInit {

  cancelleds

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.cancelleds = this.route.snapshot.data.parcels
  }

  getPaginatedData(query) {
    this.api.getAllCancelledParcels(query).subscribe(data => this.cancelleds = data)
  }

}
