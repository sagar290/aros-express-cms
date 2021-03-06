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
  changed_status

  allStatus = [
    {
      title: 'Stored',
      value: 'STORED'
    },
    {
      title: 'Ready',
      value: 'READY'
    },
    {
      title: 'Paid',
      value: 'PAID'
    },
    {
      title: 'Return',
      value: 'RETURNED'
    },
    {
      title: 'Cancelled',
      value: 'CANCELLED'
    }
  ]

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private snackbar: MatSnackBar,
    private common: CommonService
  ) { }

  ngOnInit(): void {
    this.parcel = this.route.snapshot.data.parcel;
    this.pickupmen = this.route.snapshot.data.pickupmen;
    this.deliverymen = this.route.snapshot.data.deliverymen;

    this.getAllStatus();
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

  getPickupmanName(id) {
    return id ? this.pickupmen.filter(x => x.id == id)[0].name : 'None is assigned yet'
  }
  getDeliverymanName(id) {
    return id ? this.deliverymen.filter(x => x.id == id)[0].name : 'None is assigned yet'
  }

  getAllStatus() {
    if (this.parcel.status === 'STORED') {
      this.allStatus = [
        {
          title: 'READY',
          value: 'READY'
        },
        {
          title: 'CANCELLED',
          value: 'CANCELLED'
        }
      ]
    } else if (this.parcel.status === 'PICKED') {
      this.allStatus = [
        {
          title: 'STORED',
          value: 'STORED'
        },
        {
          title: 'CANCELLED',
          value: 'CANCELLED'
        }
      ]
    } 
    
    else if(this.parcel.status == 'INPROGRESS') {
      this.allStatus = [
        {
          title: 'RETURNED',
          value: 'RETURNED'
        },
        {
          title: 'CANCELLED',
          value: 'CANCELLED'
        }
      ];
    }
    else if (this.parcel.status == 'DELIVERED') {
      this.allStatus = [
        {
          title: 'PAID',
          value: 'PAID'
        }
      ];
    }
    else if (this.parcel.status !== 'DELIVERED' && this.parcel.status !== 'CANCELLED' && this.parcel.status !== 'RETURNED' && this.parcel.status !== 'PAID') {
      this.allStatus = [

        {
          title: 'CANCELLED',
          value: 'CANCELLED'
        }
      ];
    } else {
      this.allStatus = []
    }
  }

  getContact(contact) {
    return contact.split('').reduce((acc, el, i) => {
      if (i <= 2) return ''
      if (i > 2 && el) return `${acc}${el}`
    }, '')
  }

  changeParcelStatus(data) {
    
    this.common.confirm.subscribe(confirm => {
      if (confirm) {
        this.api.postParcelStatus(this.parcel.id, data).subscribe((data: any) => {
          this.snackbar.open('Status Changed!', 'close', {
            duration: 4000
          })
          this.parcel.status = this.parcel.changed_status
        }, (e) => {
          this.snackbar.open(`${e.error.message}`, 'close', {
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
          'pickup_address': this.parcel.pickup_address,
          'customer_name': this.parcel.customer_name,
          'customer_address': this.parcel.customer_address,
          'customer_city': this.parcel.customer_city,
          'customer_area': this.parcel.customer_area,
          'customer_contact': `+88${this.parcel.customer_contact}`,
          'category': this.parcel.category,
          'payment_amont': this.parcel.payment_amount,
          'merchant_no': `+88${this.parcel.merchant_no}`,
          'product_additional_info': this.parcel.product_additional_info,
          'product_net_weight': this.parcel.product_net_weight
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
