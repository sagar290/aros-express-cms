import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'itemname'
})

export class ItemNamePipe implements PipeTransform {
    transform(sku_id: number, items: any): string {
        return items.find(x => x.sku_id === sku_id).title_bn
    }
}