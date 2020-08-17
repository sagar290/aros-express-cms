import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/core/http/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-completed-parcel',
  templateUrl: './completed-parcel.component.html',
  styleUrls: ['./completed-parcel.component.scss']
})
export class CompletedParcelComponent implements OnInit {

  completeds

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) {  }

  ngOnInit(): void {
    this.completeds = this.route.snapshot.data.parcels
  }

  getPaginatedData(query) {
    this.api.getAllCompletedParcels(query).subscribe(data => this.completeds = data)
  }

}
