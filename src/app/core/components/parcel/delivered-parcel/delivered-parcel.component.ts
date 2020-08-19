import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/core/http/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-completed-parcel',
  templateUrl: './delivered-parcel.component.html',
  styleUrls: ['./delivered-parcel.component.scss']
})
export class DeliveredParcelComponent implements OnInit {

  delivereds

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) {  }

  ngOnInit(): void {
    this.delivereds = this.route.snapshot.data.parcels
  }

  getPaginatedData(query) {
    this.api.getAllDeliveredParcels(query).subscribe(data => this.delivereds = data)
  }

}
