import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/core/http/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '@app/shared/services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-pickupman',
  templateUrl: './edit-pickupman.component.html',
  styleUrls: ['./edit-pickupman.component.scss']
})
export class EditPickupmanComponent implements OnInit {
  edited: boolean = false
  pman
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
    private route: ActivatedRoute,
    private common: CommonService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.pman = this.route.snapshot.data.pickupman
    this.pickupman.patchValue({
      contact: this.getContact(this.pman.contact),
      password: this.pman.password,
      name: this.pman.name,
      nid: this.pman.nid,
      location: this.pman.location,
      area: this.pman.area,
      satus: this.pman.status
    })
    console.log(this.pickupman.getRawValue());
  }

  getContact(contact) {
    return contact.split('').reduce((acc, el, i) => {
      if (i <= 2) return ""
      if (i > 2 && el) return `${acc}${el}`
    }, "")
  }

  save() {
    console.log(this.pickupman.getRawValue());


    // this.common.confirm.subscribe(confirm => {
    //   if (confirm) {
    //     this.api.editPickupman(this.pman.id, 'aa').subscribe(data => {
    //       this.snackbar.open('Edited Successfully!', 'close', {
    //         duration: 4000
    //       })
    //     }, (e) => {
    //       this.snackbar.open(`${e.error.message}`, 'close', {
    //         duration: 4000
    //       })
    //     })
    //   }
    // })
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

}
