import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../interfaces/article';
import { Category } from '../enums/enums';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(allArticles: Article[], category: Category): Article[] {
    if(category === Category.All){
      return allArticles;
    }
    return allArticles.filter(article => (article.category === category))
  }

}
