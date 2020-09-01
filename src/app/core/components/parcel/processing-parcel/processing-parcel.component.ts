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

  search_type =  'by_id';
  search_value = '';
  public search() {

    const query = {
      search_type: this.search_type,
      search_value: this.search_value,
    };
    const data = this.api.getAllProcessingParcels(query).subscribe(data => this.processings = data);
  }
}
