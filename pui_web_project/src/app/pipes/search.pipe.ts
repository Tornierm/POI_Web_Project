import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../interfaces/article';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(articles: Article[], term: string): Article[] {
    if (term == "") return articles;
    term = term.toLowerCase();

    return articles.filter(article => {
      return article.body.toLowerCase().includes(term) || article.subtitle.toLowerCase().includes(term) || article.abstract.toLowerCase().includes(term) || article.body.toLowerCase().includes(term);
    });
  }

}
