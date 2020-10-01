import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/core/http/api.service';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent implements OnInit {
  merchants: any = {
    data: []
  };

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.api.getAllMerchant().subscribe(data => {
      this.merchants = data;
      // console.log(data);
    })
  }

  getPaginatedData(query) {
    this.api.getAllMerchant(query).subscribe(data => this.merchants = data)
  }



  search_type =  'by_id';
  search_value = '';
  public search() {

    const query = {
      search_type: this.search_type,
      search_value: this.search_value,
    };
    const data = this.api.getAllMerchant(query).subscribe(data => this.merchants = data);
  }


}
