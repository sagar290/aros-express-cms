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

  getAllPendingParcels(query = {}) {
    return this.http.get(`${environment.api_url}/cms/parcel${this.objectToUrl(query)}`)
  }
  getAllStoredParcels(query = {}) {
    return this.http.get(`${environment.api_url}/cms/parcel?status=STORED${this.objectToUrl(query)}`)
  }
  getAllProcessingParcels(query = {}) {
    return this.http.get(`${environment.api_url}/cms/parcel?status=PROCESSING${this.objectToUrl(query)}`)
  }
  getAllPickedParcels(query = {}) {
    return this.http.get(`${environment.api_url}/cms/parcel?status=PICKED${this.objectToUrl(query)}`)
  }
  getAllReadyParcels(query = {}) {
    return this.http.get(`${environment.api_url}/cms/parcel?status=READY${this.objectToUrl(query)}`)
  }
  getAllInprogressParcels(query = {}) {
    return this.http.get(`${environment.api_url}/cms/parcel?status=INPROGRESS${this.objectToUrl(query)}`)
  }
  getAllDeliveredParcels(query = {}) {
    return this.http.get(`${environment.api_url}/cms/parcel?status=DELIVERED${this.objectToUrl(query)}`)
  }
  getAllCancelledParcels(query = {}) {
    return this.http.get(`${environment.api_url}/cms/parcel?status=CANCELLED${this.objectToUrl(query)}`)
  }
  getParcel(id) {
    return this.http.get(`${environment.api_url}/cms/parcel/${id}`).pipe(map((data: any) => data.data))
  }
  editParcel(id, data) {
    return this.http.patch(`${environment.api_url}/cms/parcel/${id}`, data).pipe(map((data: any) => data.data))
  }
  postParcelStatus(id, data) {
    return this.http.post(`${environment.api_url}/cms/parcel/${id}/status`, data)
  }

  // pickupman
  getAllPickupman() {
    return this.http.get(`${environment.api_url}/cms/pickupman/all`).pipe(map((data: any) => data.data))
  }
  editPickupman(id, data) {
    return this.http.patch(`${environment.api_url}/cms/pickupman/${id}`, data).pipe(map((data: any) => data.data))
  }
  getPickupman(id) {
    return this.http.get(`${environment.api_url}/cms/pickupman/${id}`).pipe(map((data: any) => data.data))
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
  editDeliveryman(id, data) {
    return this.http.patch(`${environment.api_url}/cms/deliveryman/${id}`, data).pipe(map((data: any) => data.data))
  }
  getDeliveryman(id) {
    return this.http.get(`${environment.api_url}/cms/deliveryman/${id}`).pipe(map((data: any) => data.data))
  }
  addDeliveryman(data) {
    return this.http.post(`${environment.api_url}/cms/deliveryman`, data).pipe(map((data: any) => data.data))
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
