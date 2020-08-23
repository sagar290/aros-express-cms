import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/core/http/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '@app/shared/services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-deliveryman',
  templateUrl: './edit-deliveryman.component.html',
  styleUrls: ['./edit-deliveryman.component.scss']
})
export class EditDeliverymanComponent implements OnInit {
  edited: boolean = false
  editedPass: boolean = false
  dman
  deliveryman: FormGroup = this.fb.group({
    contact: ["", [Validators.required, Validators.pattern("^0?1[3456789][0-9]{8}$")]],
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
    this.dman = this.route.snapshot.data.deliveryman
    this.deliveryman.patchValue({
      contact: this.getContact(this.dman.contact),
      password: this.dman.password,
      name: this.dman.name,
      nid: this.dman.nid,
      location: this.dman.location,
      area: this.dman.area,
      satus: this.dman.status
    })
  }

  getContact(contact) {
    return contact.split('').reduce((acc, el, i) => {
      if (i <= 2) return ""
      if (i > 2 && el) return `${acc}${el}`
    }, "")
  }

  resetPassword() {
    this.common.confirm.subscribe(data => {
      if (data) {
        this.api.editPickupman(this.dman.id, {
          password: this.dman.password || "123"
        }).subscribe(data => {
          this.snackbar.open('Password changed!', 'close', {
            duration: 4000
          })
          this.editedPass = false
        })
      }
    })
  }

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
    this.api.editDeliveryman(this.dman.id, data).subscribe(data => {
      this.dman = data
      this.snackbar.open('Image changed successfully!', 'close', {
        duration: 4000
      })
    })
  }

  save() {
    if (this.deliveryman.valid) {
      this.common.confirm.subscribe(confirm => {
        if (confirm) {
          this.api.editDeliveryman(this.dman.id, {
            contact: `+88${this.deliveryman.get('contact').value}`,
            name: this.deliveryman.get('name').value,
            nid: this.deliveryman.get('nid').value,
            location: this.deliveryman.get('location').value,
            area: this.deliveryman.get('area').value,
            satus: this.deliveryman.get('satus').value == 1 ? true : false
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
    return this.deliveryman.get('name');
  }
  get nid() {
    return this.deliveryman.get('nid');
  }
  get contact() {
    return this.deliveryman.get('contact');
  }
  get password() {
    return this.deliveryman.get('password');
  }
  get location() {
    return this.deliveryman.get('location');
  }
  get area() {
    return this.deliveryman.get('area');
  }
  get satus() {
    return this.deliveryman.get('satus');
  }

}
