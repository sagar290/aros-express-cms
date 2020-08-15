import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-promo',
  templateUrl: './all-promo.component.html',
  styleUrls: ['./all-promo.component.scss']
})
export class AllPromoComponent implements OnInit {

  promos
  categories
  items

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.promos = this.route.snapshot.data.promos
    this.categories = this.route.snapshot.data.categories.data
    this.items = this.route.snapshot.data.items.data
  }
}
