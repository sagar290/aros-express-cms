import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/core/http/api.service';
import { CommonService } from '@app/shared/services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-pickupman',
  templateUrl: './add-pickupman.component.html',
  styleUrls: ['./add-pickupman.component.scss']
})
export class AddPickupmanComponent implements OnInit {

  pickupman: FormGroup = this.fb.group({
    contact: ["", [Validators.required, Validators.pattern("^0?1[3456789][0-9]{8}$")]],
    password: ["", Validators.required],
    name: ["", Validators.required],
    nid: ["", Validators.required],
    location: ["", Validators.required],
    area: ["", Validators.required],
    satus: [false, Validators.required]
  })

  constructor(
    private api: ApiService,
    private common: CommonService,
    private snackbar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  get name() {
    return this.pickupman.get('name');
  }
  get nid() {
    return this.pickupman.get('nid');
  }
  get contact() {
    return this.pickupman.get('contact');
  }
  get password() {
    return this.pickupman.get('password');
  }
  get location() {
    return this.pickupman.get('location');
  }
  get area() {
    return this.pickupman.get('area');
  }
  get satus() {
    return this.pickupman.get('satus');
  }

  save() {
    if (this.pickupman.valid) {
      this.common.confirm.subscribe(confirm => {
        if (confirm) {
          this.api.addPickupman({
            contact: `+88${this.pickupman.get('contact').value}`,
            password: this.pickupman.get('password').value,
            name: this.pickupman.get('name').value,
            nid: this.pickupman.get('nid').value,
            location: this.pickupman.get('location').value,
            area: this.pickupman.get('area').value,
            satus: this.pickupman.get('satus').value === 1 ? true : false
          }).subscribe(data => {
            this.snackbar.open('Added Successfully', 'close', {
              duration: 4000
            })
            this.router.navigate(['/pickupman', 'all'])
          }, (e: any) => {
            this.snackbar.open(e.error.message, 'close', {
              duration: 4000
            })
          })
        }
      })
    } else {
      this.snackbar.open('Form is incomplete, fill up every field!', 'close', {
        duration: 4000
      })
    }
  }

}
