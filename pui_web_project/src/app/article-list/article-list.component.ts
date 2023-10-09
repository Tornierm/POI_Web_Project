import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Article } from '../interfaces/article';
import { User } from '../interfaces/user';
import { DummyServiceService } from '../services/dummy-service.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent {

  article!: Article
  constructor(private newsService: DummyServiceService, private loginService: DummyServiceService, private route: ActivatedRoute, private router: Router){}

  articles: Article[] = this.newsService.getArticles();

  loggedInUser: User = this.loginService.login("admin","admin");

  editArticle(id: number){
    this.router.navigate([`/edit/${id}`, {}]);
  }

  deleteArticle(id:number){}

  newArticle(){
    this.router.navigate([`/edit/${null}`, {}]);
  }





  

}
