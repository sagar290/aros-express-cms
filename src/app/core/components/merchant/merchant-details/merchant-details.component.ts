import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/core/http/api.service';
import { StorageService } from '@app/core/services/storage.service';
import { CommonService } from '@app/shared/services/common.service';

@Component({
  selector: 'app-merchant-details',
  templateUrl: './merchant-details.component.html',
  styleUrls: ['./merchant-details.component.scss']
})
export class MerchantDetailsComponent implements OnInit {
  user_id;
  user = {
    id:  0,
    name:  '',
    nid: '',
    dp:  '',
    nid_front: '',
    nid_back: '',
    business_name: '',
    business_type: '',
    business_address: '',
    contact: '',
    joined: ''
   };
  parcels;
  completeParcel = [];
  processingParcel = [];
  failedParcel = [];
  constructor(
    public api: ApiService,
    public router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private storage: StorageService,
    public common: CommonService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {

      this.user_id = params.merchant_id;

      this.api.getAllMerchantDetails(this.user_id).subscribe((data: any) => {
        this.user = data.data;
      });

      this.getParcelData(this.user_id);
    });
  }

  getParcelData(query: any) {
    this.api.getAllMerchantOrders(this.user_id).subscribe((data: any) => {
      this.parcels = data.data.completed;
      console.log(data);
      
      this.completeParcel = data.data.completed;
      // this.processingParcel = this.parcels.filter(d => d.status.toUpperCase() !== 'COMPLETED');
      this.processingParcel = data.data.processing;
      this.failedParcel = data.data.failed;

    })
  }

  countTotalPayment(data) {

    var t_price = 0;
    // console.log(data);
    for (let item of data) {
      t_price += item.total_amount;
      // console.log(item);
    }

    return t_price;
  }

  showParcelComplteList() {
    this.parcels = this.completeParcel;
  }


  showParcelProcessingList() {
    this.parcels = this.processingParcel;
  }

  showParcelFailedList() {
    this.parcels = this.failedParcel;
  }


  search_type =  'by_id';
  search_value = '';
  public search() {

    const query = {
      search_type: this.search_type,
      search_value: this.search_value,
    };
    const data = this.api.getAllMerchantOrders(this.user_id, query).subscribe((data: any) => {
      this.parcels = data.data.completed;

      this.completeParcel = data.data.completed;
      // this.processingParcel = this.parcels.filter(d => d.status.toUpperCase() !== 'COMPLETED');
      this.processingParcel = data.data.processing;
      this.failedParcel = data.data.failed;
    });
  }

}
