import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/core/http/api.service';

@Component({
  selector: 'app-picked-parcel',
  templateUrl: './picked-parcel.component.html',
  styleUrls: ['./picked-parcel.component.scss']
})
export class PickedParcelComponent implements OnInit {

  pickeds

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pickeds = this.route.snapshot.data.parcels
  }

  getPaginatedData(query) {
    this.api.getAllPickedParcels(query).subscribe(data => this.pickeds = data)
  }

  search_type =  'by_id';
  search_value = '';
  public search() {

    const query = {
      search_type: this.search_type,
      search_value: this.search_value,
    };
    const data = this.api.getAllPickedParcels(query).subscribe(data => this.pickeds = data);
  }

}
