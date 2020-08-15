import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'perc'
})
export class PercPipe implements PipeTransform {
    transform(d: number, p: number): string {
        return (d - (d * p) / 100).toFixed(0)
    }
}