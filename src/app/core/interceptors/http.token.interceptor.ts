import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { ApiService } from '../http/api.service';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })

export class HttpTokenInterceptor implements HttpInterceptor {
    constructor(
        private storage: StorageService,
        private api: ApiService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let headersConfig = {
            "Accept": '*/*'
        };

        const TOKEN: any = this.storage.getItem('token') ? this.storage.getItem('token')['access_token'] : null

        const TOKEN_TYPE: any = this.storage.getItem('token') ? this.storage.getItem('token')['token_type'] : null

        // if (req.url.startsWith('http://api')) {
            TOKEN && TOKEN_TYPE ? headersConfig['Authorization'] = `${TOKEN_TYPE} ${TOKEN}` : ''
        // }

        const request = req.clone({ setHeaders: headersConfig })

        this.api.isLoading.next(true)
        return next.handle(request)
            .pipe(
                map(res => res),
                catchError(error => {
                    this.api.isLoading.next(false)
                    return this.errorHandler(error)
                }),
                finalize(() => this.api.isLoading.next(false))
            )
    }

    private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
        return throwError(response)
    }
}
