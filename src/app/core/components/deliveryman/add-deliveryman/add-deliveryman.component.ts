import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/core/http/api.service';
import { CommonService } from '@app/shared/services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-deliveryman',
  templateUrl: './add-deliveryman.component.html',
  styleUrls: ['./add-deliveryman.component.scss']
})
export class AddDeliverymanComponent implements OnInit {

  deliveryman: FormGroup = this.fb.group({
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

  save() {
    if (this.deliveryman.valid) {
      this.common.confirm.subscribe(confirm => {
        if (confirm) {
          this.api.addDeliveryman({
            contact: `+88${this.deliveryman.get('contact').value}`,
            password: this.deliveryman.get('password').value,
            name: this.deliveryman.get('name').value,
            nid: this.deliveryman.get('nid').value,
            location: this.deliveryman.get('location').value,
            area: this.deliveryman.get('area').value,
            satus: this.deliveryman.get('satus').value === 1 ? true : false
          }).subscribe(data => {
            this.snackbar.open('Added Successfully', 'close', {
              duration: 4000
            })
            this.router.navigate(['/deliveryman', 'all'])
          }, (e: any) => {
            this.snackbar.open(e.error.message, 'close', {
              duration: 4000
            })
          })
        }
      })
    } else {
      this.snackbar.open('Form is incomplete, fill up accordingly!', 'close', {
        duration: 4000
      })
    }
  }

}
