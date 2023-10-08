import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryNationalFilter'
})
export class CategoryNationalFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
