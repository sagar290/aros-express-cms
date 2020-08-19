import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-pickupman',
  templateUrl: './all-pickupman.component.html',
  styleUrls: ['./all-pickupman.component.scss']
})
export class AllPickupmanComponent implements OnInit {

  pickupmen

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pickupmen = this.route.snapshot.data.pickupmen
  }

  getJoinInfo(date) {
    return date ? date.split(' ')[0] : "-"
  }

}
