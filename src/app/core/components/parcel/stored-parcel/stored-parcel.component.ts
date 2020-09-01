import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/core/http/api.service';

@Component({
  selector: 'app-stored-parcel',
  templateUrl: './stored-parcel.component.html',
  styleUrls: ['./stored-parcel.component.scss']
})
export class StoredParcelComponent implements OnInit {

  storeds

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.storeds = this.route.snapshot.data.parcels
  }

  getPaginatedData(query) {
    this.api.getAllStoredParcels(query).subscribe(data => this.storeds = data)
  }

  search_type =  'by_id';
  search_value = '';
  public search() {

    const query = {
      search_type: this.search_type,
      search_value: this.search_value,
    };
    const data = this.api.getAllStoredParcels(query).subscribe(data => this.storeds = data);
  }

}
