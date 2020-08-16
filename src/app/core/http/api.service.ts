import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public selectedPath = new BehaviorSubject<string>(null)
  public drawerOpen = new BehaviorSubject<boolean>(false)
  public isLoading = new BehaviorSubject<boolean>(false)

  constructor(
    private http: HttpClient
  ) { }

  getAllPendingParcels() {
    return this.http.get(`${environment.api_url}/cms/parcel`).pipe(map((data: any) => data.data))
  }
  getAllStoredParcels() {
    return this.http.get(`${environment.api_url}/cms/parcel?status=STORED`).pipe(map((data: any) => data.data))
  }
  getAllProcessedParcels() {
    return this.http.get(`${environment.api_url}/cms/parcel?status=PROCESSING`).pipe(map((data: any) => data.data))
  }
  getAllCompletedParcels() {
    return this.http.get(`${environment.api_url}/cms/parcel?status=COMPLETED`).pipe(map((data: any) => data.data))
  }
  getAllCancelledParcels() {
    return this.http.get(`${environment.api_url}/cms/parcel?status=CANCELLED`).pipe(map((data: any) => data.data))
  }
  getParcel(id) {
    return this.http.get(`${environment.api_url}/cms/parcel/${id}`).pipe(map((data: any) => data.data))
  }
  editParcel(id, data) {
    return this.http.patch(`${environment.api_url}/cms/parcel/${id}`, data).pipe(map((data: any) => data.data))
  }
  cancelParcel(id, data) {
    return this.http.post(`${environment.api_url}/cms/parcel/${id}`, data).pipe(map((data: any) => data.data))
  }

  // pickupman
  getAllPickupman() {
    return this.http.get(`${environment.api_url}/cms/pickupman/all`).pipe(map((data: any) => data.data))
  }
  addPickupman(data) {
    return this.http.post(`${environment.api_url}/cms/pickupman`, data).pipe(map((data: any) => data.data))
  }

  assignPickupOrDeliveryman(id, data) {
    return this.http.post(`${environment.api_url}/cms/parcel/${id}/assign`, data).pipe(map((data: any) => data.data))
  }

  // deliveryman
  getAllDeliveryman() {
    return this.http.get(`${environment.api_url}/cms/deliveryman/all`).pipe(map((data: any) => data.data))
  }
  addDeliveryman(data) {
    return this.http.post(`${environment.api_url}/cms/deliveryman`, data).pipe(map((data: any) => data.data))
  }

  // promo

  getPromosPaginated(query = {}) {
    return this.http.get(`${environment.api_url}/v1/discount/promo-codes?${this.objectToUrl(query)}`).pipe(map((data: any) => data.data))
  }

  getPromo(id) {
    return this.http.get(`${environment.api_url}/v1/discount/promo-code/${id}`).pipe(map((data: any) => data.data))
  }

  updatePromo(id, data) {
    return this.http.put(`${environment.api_url}/v1/discount/promo-code/${id}`, data)
  }

  postPromo(data) {
    return this.http.post(`${environment.api_url}/v1/discount/promo-code`, data).pipe(map((data: any) => data.data))
  }

  // reports > transactions
  getTransactionInfoByDate(date, query = {}) {
    return this.http.get(`${environment.api_url}/v1/transactions/total/date/${date}?${this.objectToUrl(query)}`).pipe(map((data: any) => data.data))
  }
  getTransactionByDate(date, query = {}) {
    return this.http.get(`${environment.api_url}/v1/transactions/date/${date}?${this.objectToUrl(query)}`).pipe(map((data: any) => data.data))
  }
  getTransactionDetailesByDate(date, query = {}) {
    return this.http.get(`${environment.api_url}/v1/transactions/details/date/${date}?${this.objectToUrl(query)}`).pipe(map((data: any) => data.data))
  }

  getTransactionInfoByDateRange(start, end) {
    return this.http.get(`${environment.api_url}/v1/transactions/total/date-range/${start}/${end}`).pipe(map((data: any) => data.data))
  }
  getTransactionsByDateRange(start, end) {
    return this.http.get(`${environment.api_url}/v1/transactions/date-range/${start}/${end}`).pipe(map((data: any) => data.data))
  }
  getTransactionDetailsByDateRange(start, end, query = {}) {
    return this.http.get(`${environment.api_url}/v1/transactions/details/date-range/${start}/${end}?${this.objectToUrl(query)}`).pipe(map((data: any) => data.data))
  }

  postS3SignedLink(file_timestamp, file_extension, file_type, path) {
    return this.http.post(`${environment.api_url}/api/getpostvideourl`,
      {
        "fileName": `${file_timestamp}.${file_extension}`,
        "contentType": `${file_type}`,
        "path": `${path}`
      }).pipe(map((link: any) => link.data))
  }

  putFileToS3(file: any, signedURL, contentType) {
    return this.http.put(signedURL,
      file,
      {
        headers: {
          'Content-Type': `${contentType}`
        }
      }
    );
  }

  objectToUrl(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p) && obj[p]) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

}
