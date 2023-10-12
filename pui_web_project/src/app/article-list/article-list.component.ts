import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Article } from '../interfaces/article';
import { User } from '../interfaces/user';
import { DummyServiceService } from '../services/dummy-service.service';
import { Category } from '../enums/enums';
import { LoginService } from '../services/login.service';
import { NewsService } from '../services/news.service';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent {

  Category: typeof Category = Category;

  constructor(
    private newsService: NewsService,
    private loginService: LoginService,
    private _sanitizer: DomSanitizer,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getArticles()
    // Without subscription
    //this.value = this.route.snapshot.paramMap.get('value'); 
  }

  articles: Article [] = [];

  getArticles(){
    this.newsService.getArticles().subscribe(
      data => {
        console.log(data)
        this.articles = data
      },
      error => console.log(error),
      () => console.log("process complete"),
    )
  }

  newArticle(){
    this.router.navigate([`/edit/${null}`, {}]);
  }

  editArticle(id: number){
    this.router.navigate([`/edit/${id}`, {}]);
  }

  deleteArticle(id: number){
    this.newsService.deleteArticle(id);
  }

  searchTerm: string = "";

  category: Category = Category.All;

  setCategory(category: Category){
    this.category = category;
  }

  loggedInUser: User | null = this.loginService.getUser();

  isLogged: boolean = this.loginService.isLogged();

  update(){
    this.loggedInUser = this.loginService.getUser();
    this.isLogged= this.loginService.isLogged();
  }

  tmpUser: User = {
    Authorization: "",
    apikey: "",
    expires: "",
    group: 0,
    user: 0,
    username: "",
    passwd: "",
  };

  login(){
    this.loginService.login(this.tmpUser.username, this.tmpUser.passwd).subscribe()
    this.update()
  }

  logout(){
    this.loginService.logout()
    this.update()
  }

}
