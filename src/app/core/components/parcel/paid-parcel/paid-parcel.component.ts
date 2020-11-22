import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/core/http/api.service';

@Component({
  selector: 'app-paid-parcel',
  templateUrl: './paid-parcel.component.html',
  styleUrls: ['./paid-parcel.component.scss']
})
export class PaidParcelComponent implements OnInit {

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) {  }
  delivereds;


  // tslint:disable-next-line: member-ordering
  // tslint:disable-next-line: variable-name
  search_type =  'by_id';
  // tslint:disable-next-line: variable-name
  search_value = '';

  ngOnInit(): void {
    this.delivereds = this.route.snapshot.data.parcels;
  }

  getPaginatedData(query) {
    this.api.getAllDeliveredParcels(query).subscribe(data => this.delivereds = data);
  }
  
  public search() {

    const query = {
      search_type: this.search_type,
      search_value: this.search_value,
    };
    const data = this.api.getAllDeliveredParcels(query).subscribe(data => this.delivereds = data);
  }

}
