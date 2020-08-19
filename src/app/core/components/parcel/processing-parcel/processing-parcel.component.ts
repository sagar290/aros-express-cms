import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/core/http/api.service';

@Component({
  selector: 'app-processing-parcel',
  templateUrl: './processing-parcel.component.html',
  styleUrls: ['./processing-parcel.component.scss']
})
export class ProcessingParcelComponent implements OnInit {

  processings

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.processings = this.route.snapshot.data.parcels
  }

  getPaginatedData(query) {
    this.api.getAllProcessingParcels(query).subscribe(data => this.processings = data)
  }
}
