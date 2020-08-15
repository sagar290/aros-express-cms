import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/core/http/api.service';

@Component({
  selector: 'app-processed-parcel',
  templateUrl: './processed-parcel.component.html',
  styleUrls: ['./processed-parcel.component.scss']
})
export class ProcessedParcelComponent implements OnInit {

  processeds

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.processeds = this.route.snapshot.data.parcels
  }

}
