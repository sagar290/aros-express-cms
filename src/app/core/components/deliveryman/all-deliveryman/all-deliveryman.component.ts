import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-deliveryman',
  templateUrl: './all-deliveryman.component.html',
  styleUrls: ['./all-deliveryman.component.scss']
})
export class AllDeliverymanComponent implements OnInit {

  deliverymen

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.deliverymen = this.route.snapshot.data.deliverymen
  }

  getJoinInfo(date) {
    return date ? date.split(' ')[0] : "-"
  }

}
