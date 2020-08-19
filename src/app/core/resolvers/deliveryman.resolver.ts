import { Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from '../http/api.service'

@Injectable()
export class DeliverymanResolver implements Resolve<any> {

    constructor(private api: ApiService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.api.getDeliveryman(route.params.deliveryman_id)
    }
}
