import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/http/api.service';
import { AuthService } from '@app/modules/authentication/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private api: ApiService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.api.drawerOpen.subscribe(data => this.drawerAcivated = data)
  }

  parcel: boolean = true
  pickupMan: boolean = false
  deliveryMan: boolean = false

  drawerAcivated: boolean = false
  hideDrawer() {
    this.api.drawerOpen.next(false)
  }

  logout() {
    this.auth.logout()
  }
}
