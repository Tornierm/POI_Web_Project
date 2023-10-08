import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Article } from '../interfaces/article';
import { User } from '../interfaces/user';
import { DummyServiceService } from '../services/dummy-service.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent {

  constructor(private newsService: DummyServiceService, private loginService: DummyServiceService){}

  articles: Article[] = this.newsService.getArticles();

  loggedInUser: User = this.loginService.login("admin","admin");





  

}
