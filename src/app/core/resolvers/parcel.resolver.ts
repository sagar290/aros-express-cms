import { Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from '../http/api.service'

@Injectable()
export class ParcelResolver implements Resolve<any> {

    constructor(private api: ApiService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.api.getParcel(route.params.parcel_id)
    }
}
