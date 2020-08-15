import { Resolve } from '@angular/router'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from '../http/api.service'

@Injectable()
export class PickupmenResolver implements Resolve<any> {

    constructor(private api: ApiService) { }

    resolve(): Observable<any> {
        return this.api.getAllPickupman()
    }
}
