import { Component, OnInit } from '@angular/core';
import { Promo } from "@app/core/models/promo.model";
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/core/http/api.service';
import { CommonService } from '@app/shared/services/common.service';

@Component({
  selector: 'app-create-promo',
  templateUrl: './create-promo.component.html',
  styleUrls: ['./create-promo.component.scss']
})
export class CreatePromoComponent implements OnInit {
  items
  categories
  modItems
  promo: Promo = {
    code: "",
    discount_percent: null,
    aff_id: null,
    sku_id: null,
    sku_cat_id: null,
    c_group: "",
    one_time: false,
    status: false,
    start: "",
    end: ""
  }
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private common: CommonService,
  ) { }

  ngOnInit(): void {
    this.categories = this.route.snapshot.data.categories.data
    this.items = this.route.snapshot.data.items.data
  }

  onCategoryChange(val) {
    this.modItems = this.items.filter(x => x.cat_id == val)
    this.promo.sku_cat_id = +val
  }

  onDateChange(key, val) {
    this.promo[key] = this.common.getDate(val)
  }



  save() {
    this.common.confirm.subscribe(confirm => {
      if (confirm) {
        this.api.postPromo(this.promo).subscribe(data => {
          this.router.navigate(['/promo/all'])
        })
      }
    })
  }

}
