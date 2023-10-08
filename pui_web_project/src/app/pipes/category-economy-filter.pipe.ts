import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryEconomyFilter'
})
export class CategoryEconomyFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
