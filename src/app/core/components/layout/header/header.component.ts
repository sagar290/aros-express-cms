import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/http/api.service';
import { AuthService } from '@app/modules/authentication/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user

  constructor(
    private api: ApiService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.api.drawerOpen.subscribe(data => this.sidebarStatus = data)
    this.auth.currentUserSubject.subscribe(data => this.user = data)
  }

  sidebarStatus: boolean

  toggleSidebar() {
    this.api.drawerOpen.next(!this.sidebarStatus)
  }

  logout() {
    this.auth.logout()
  }

}
