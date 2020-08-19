import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/core/http/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ready-parcel',
  templateUrl: './ready-parcel.component.html',
  styleUrls: ['./ready-parcel.component.scss']
})
export class ReadyParcelComponent implements OnInit {

  readys

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.readys = this.route.snapshot.data.parcels
  }

  getPaginatedData(query) {
    this.api.getAllReadyParcels(query).subscribe(data => this.readys = data)
  }

}
