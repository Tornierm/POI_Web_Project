import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../interfaces/article';

@Pipe({
  name: 'categorySportsFilter'
})
export class CategorySportsFilterPipe implements PipeTransform {

  transform(allArticles: Article[], categorySports: boolean): Article[] {

    if(categorySports) {
      return allArticles.filter(article => (article.category !== "Sports"))
    }
    return allArticles;
  }

}
