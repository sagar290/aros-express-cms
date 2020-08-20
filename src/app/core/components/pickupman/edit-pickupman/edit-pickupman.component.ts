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
  }

  getContact(contact) {
    return contact.split('').reduce((acc, el, i) => {
      if (i <= 2) return ""
      if (i > 2 && el) return `${acc}${el}`
    }, "")
  }
  base64Image

  onDpChange(files) {
    let reader = new FileReader(), instance = this
    reader.readAsDataURL(files[0]);
    reader.onload = function () {
      instance.common.confirm.subscribe(confirm => {
        if (confirm) {
          instance.postDp({ dp: reader.result.toString() })
        }
      })
    }
  }
  onNidFrontChange(files) {
    let reader = new FileReader(), instance = this
    reader.readAsDataURL(files[0]);
    reader.onload = function () {
      instance.common.confirm.subscribe(confirm => {
        if (confirm) {
          instance.postDp({ nid_front: reader.result.toString() })
        }
      })
    }
  }
  onNidBackChange(files) {
    let reader = new FileReader(), instance = this
    reader.readAsDataURL(files[0]);
    reader.onload = function () {
      instance.common.confirm.subscribe(confirm => {
        if (confirm) {
          instance.postDp({ nid_back: reader.result.toString() })
        }
      })
    }
  }

  postDp(data) {
    this.api.editPickupman(this.pman.id, data).subscribe(data => {
      this.pman = data
      this.snackbar.open('Image changed successfully!', 'close', {
        duration: 4000
      })
    })
  }

  save() {
    if (this.pickupman.valid) {
      this.common.confirm.subscribe(confirm => {
        if (confirm) {
          this.api.editPickupman(this.pman.id, {
            contact: `+88${this.pickupman.get('contact').value}`,
            password: this.pickupman.get('password').value,
            name: this.pickupman.get('name').value,
            nid: this.pickupman.get('nid').value,
            location: this.pickupman.get('location').value,
            area: this.pickupman.get('area').value,
            satus: this.pickupman.get('satus').value == 1 ? true : false
          }).subscribe(data => {
            this.edited = false
            this.snackbar.open('Edited Successfully', 'close', {
              duration: 4000
            })
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
