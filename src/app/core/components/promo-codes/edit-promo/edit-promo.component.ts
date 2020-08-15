import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/core/http/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '@app/shared/services/common.service';

@Component({
  selector: 'app-edit-promo',
  templateUrl: './edit-promo.component.html',
  styleUrls: ['../create-promo/create-promo.component.scss']
})
export class EditPromoComponent implements OnInit {

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private common: CommonService,
    private router: Router
  ) { }

  promo
  categories
  items
  modItems

  ngOnInit(): void {
    this.promo = this.route.snapshot.data.promo
    this.categories = this.route.snapshot.data.categories.data
    this.items = this.route.snapshot.data.items.data
    this.modItems = this.route.snapshot.data.items.data
  }

  onCategoryChange(val) {
    this.modItems = this.items.filter(x => x.cat_id == val)
    this.promo.sku_cat_id = +val
  }

  onDateChange(key, val) {
    this.promo[key] = this.common.getDate(val)
  }

  save() {
    this.common.confirm.subscribe(isTrue => {
      if (isTrue) {
        this.api.updatePromo(this.promo.code_id, this.promo).subscribe(data => {
          this.router.navigate(['/promo/all'])
        })
      }
    })

  }

}
