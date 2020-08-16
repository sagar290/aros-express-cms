import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/core/http/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from '@app/shared/services/common.service';

@Component({
  selector: 'app-edit-parcel',
  templateUrl: './edit-parcel.component.html',
  styleUrls: ['./edit-parcel.component.scss']
})
export class EditParcelComponent implements OnInit {

  edited: boolean = false
  parcel
  pickupmen
  deliverymen

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private snackbar: MatSnackBar,
    private common: CommonService
  ) { }

  ngOnInit(): void {
    this.parcel = this.route.snapshot.data.parcel
    this.pickupmen = this.route.snapshot.data.pickupmen
    this.deliverymen = this.route.snapshot.data.deliverymen
  }

  assignPDman(data) {
    this.common.confirm.subscribe(confirm => {
      if (confirm) {
        this.api.assignPickupOrDeliveryman(this.parcel.id, data).subscribe(data => {
          this.snackbar.open('Assigned Successfully', 'close', {
            duration: 4000
          })
        })
      }
    })
  }

  cancelOrder() {
    this.common.confirm.subscribe(confirm => {
      if (confirm) {
        this.edited = false
        this.api.cancelParcel(this.parcel.id, {
          "pickup_address": this.parcel.pickup_address,
          "customer_name": this.parcel.customer_name,
          "customer_address": this.parcel.customer_address,
          "customer_city": this.parcel.customer_city,
          "customer_area": this.parcel.customer_area,
          "customer_contact": this.parcel.customer_contact,
          "category": this.parcel.category,
          "payment_amont": this.parcel.payment_amount,
          "merchant_no": this.parcel.merchant_no,
          "product_additional_info": this.parcel.product_additional_info,
          "product_net_weight": this.parcel.product_net_weight
        }).subscribe(data => {
          this.snackbar.open('Cancelled Successfully', 'close', {
            duration: 4000
          })
        })
      }
    })
  }

  edit() {
    this.common.confirm.subscribe(confirm => {
      if (confirm) {
        this.edited = false
        this.api.editParcel(this.parcel.id, {
          "pickup_address": this.parcel.pickup_address,
          "customer_name": this.parcel.customer_name,
          "customer_address": this.parcel.customer_address,
          "customer_city": this.parcel.customer_city,
          "customer_area": this.parcel.customer_area,
          "customer_contact": this.parcel.customer_contact,
          "category": this.parcel.category,
          "payment_amont": this.parcel.payment_amount,
          "merchant_no": this.parcel.merchant_no,
          "product_additional_info": this.parcel.product_additional_info,
          "product_net_weight": this.parcel.product_net_weight
        }).subscribe(data => {
          this.snackbar.open('Edited Successfully', 'close', {
            duration: 4000
          })
          this.edited = false
        })
      }
    })
  }
}
