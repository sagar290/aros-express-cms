import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/core/http/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { stringify } from 'querystring';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup

  showPassword: boolean = false

  constructor(
    private fb: FormBuilder,
    public api: ApiService,
    public router: Router,
    public auth: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      contact: [null, [Validators.required]],
      password: [null, Validators.required]
    });
  }

  get contact() {
    return this.loginForm.get('contact')
  }

  get password() {
    return this.loginForm.get('password')
  }

  login() {
    this.auth.login({
      contact: `+88${this.loginForm.value.contact}`,
      password: this.loginForm.value.password
    }).subscribe(
      res => { },
      (e) => {
        this.snackBar.open('Wrong credential or account doesn\'t exists!', 'close', {
          duration: 5000
        })
      }
    )
  }
}
