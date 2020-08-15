import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/core/services/storage.service';


@Injectable({ providedIn: 'root' })
export class AuthService {
  public currentUserSubject = new BehaviorSubject<any>(null)
  private isAuthenticatedSubject = new ReplaySubject<boolean>(0)

  routes = {
    login: '/auth/signin',
    register: '/auth/signup',
    get_user: '/auth/cms/user',
    logout: '/auth/logout'
  }

  static AUTH_TOKEN: string = 'access_token'
  static EXPIRES_AT: string = 'expires_at';
  static TOKEN_TYPE: string = 'token_type';

  expiredTimer: any

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private storage: StorageService) { }

  get redirectUrl() {
    return this.route.snapshot.queryParams['returnUrl'] || '/'
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    let token = this.storage.getItem("token")
    let userInfo = this.storage.getItem("user")

    if (token && token !== 'null') {
      if (userInfo && userInfo !== 'null') {
        this.currentUserSubject.next(userInfo)
      } else {
        this.http
          .get(environment.api_url + this.routes.get_user)
          .subscribe((user: any) => {
            this.storage.setItem("user", user.data)
            this.router.navigateByUrl(this.redirectUrl)
            this.currentUserSubject.next(user.data)
            this.isAuthenticatedSubject.next(true)
          }, err => {
            this.deleteSession()
          })
      }
    } else {
      this.router.navigate(['auth/signin'])
    }
  }

  login(credentials): Observable<any> {
    return this.http.post(`${environment.api_url}/auth/cms/login`, credentials)
      .pipe(
        map((data: any) => {
          console.log("1", data);

          this.createSession(data)
          this.router.navigateByUrl(this.redirectUrl)
          this.populate()
          return data;
        })
      )
  }

  register(credentials): Observable<any> {
    return this.http.post(`${environment.api_url}/auth/signup`, credentials)
      .pipe(
        map((user: any) => {
          this.createSession(user);
          this.populate()
          this.router.navigateByUrl(this.redirectUrl)
          return user;
        })
      )
  }


  public logout() {
    this.deleteSession();
    this.router.navigate(['auth/signin']);
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  public createSession(data: any) {
    // Save JWT sent from server in localstorage
    this.storage.setItem("token", data)
    this.isAuthenticatedSubject.next(true)
    this.startExpiresIn()
  }

  public deleteSession() {
    this.storage.removeItem("token")
    this.storage.removeItem("user")
    this.isAuthenticatedSubject.next(false)
  }

  public startExpiresIn() {
    const exp = this.storage.getItem('token')['expires_at']

    const _currentTime = Date.now()
    const _expiredTime = new Date(exp).getTime()

    const _expiredInMillisecs = _expiredTime - _currentTime
    if (this.expiredTimer) {
      clearTimeout(this.expiredTimer);
      this.expiredTimer = undefined;
    }
    try {
      this.expiredTimer = setTimeout(() => {
        try {
          this.deleteSession();
        } catch (err) {
          console.log('deleteSession error on session timeout: ', err);
        }
        console.log('session expired ... auto logout!');
        this.router.navigateByUrl('auth/signin');
      }, _expiredInMillisecs);
    } catch (err) {
      //console.log('expiredTimer err: ', err);
    }
  }

  public isTokenExpired() {
    const token = this.storage.getItem('token')['access_token']
    if (!token) return true

    const exp = this.storage.getItem('token')['expires_at']
    const expirationTime = new Date(exp).getTime()
    const currentTime = Date.now()

    if (currentTime >= expirationTime) return true;
    return false
  }

  public isAuthenticated() {
    return !this.isTokenExpired()
  }

}
