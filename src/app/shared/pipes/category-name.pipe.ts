import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'categoryname'
})

export class CategoryNamePipe implements PipeTransform {
    transform(category_id, categories): string {
        return categories.find(x => x.cat_id === category_id).title
    }
}