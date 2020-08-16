import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/core/http/api.service';
import { CommonService } from '@app/shared/services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pickupman',
  templateUrl: './add-pickupman.component.html',
  styleUrls: ['./add-pickupman.component.scss']
})
export class AddPickupmanComponent implements OnInit {

  pickupman = {
    contact: null,
    password: null,
    name: null,
    nid: null,
    location: null,
    area: null,
    satus: false
  }

  errors

  constructor(
    private api: ApiService,
    private common: CommonService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  save() {
    this.common.confirm.subscribe(confirm => {
      if (confirm) {
        this.api.addPickupman({
          contact: `+88${this.pickupman.contact}`,
          password: this.pickupman.password,
          name: this.pickupman.name,
          nid: this.pickupman.nid,
          location: this.pickupman.location,
          area: this.pickupman.area,
          satus: this.pickupman.satus
        }).subscribe(data => {
          this.snackbar.open('Added Successfully', 'close', {
            duration: 4000
          })
          this.router.navigate(['/pickupman', 'all'])
        }, (e) => {
          this.errors = e.error.errors
          this.snackbar.open(e.error.message, 'close', {
            duration: 4000
          })
        })
      }
    })

  }

}
