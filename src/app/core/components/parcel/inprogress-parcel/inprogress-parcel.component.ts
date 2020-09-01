import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/core/http/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inprogress-parcel',
  templateUrl: './inprogress-parcel.component.html',
  styleUrls: ['./inprogress-parcel.component.scss']
})
export class InprogressParcelComponent implements OnInit {

  inprogresses

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.inprogresses = this.route.snapshot.data.parcels
  }

  getPaginatedData(query) {
    this.api.getAllInprogressParcels(query).subscribe(data => this.inprogresses = data)
  }

  search_type =  'by_id';
  search_value = '';  
  
  public search() {

    const query = {
      search_type: this.search_type,
      search_value: this.search_value,
    };
    const data = this.api.getAllInprogressParcels(query).subscribe(data => this.inprogresses = data);
  }



}
