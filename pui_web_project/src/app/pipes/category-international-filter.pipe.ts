import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryInternationalFilter'
})
export class CategoryInternationalFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
