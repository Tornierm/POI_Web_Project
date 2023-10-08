import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Article } from '../interfaces/article';
import { User } from '../interfaces/user';
import { DummyServiceService } from '../services/dummy-service.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../enums/enums';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent {

  Category: typeof Category = Category;

  constructor(
    private newsService: DummyServiceService
  ){}

  ngOnInit(): void {

    // Without subscription
    //this.value = this.route.snapshot.paramMap.get('value'); 
  }

  articles: Article[] = this.newsService.getArticles();

  searchTerm: string = "";

  category: Category = Category.All;

  isLogged = this.newsService.isLogged()

  setCategory(category: Category){
    this.category = category;
  }
}
