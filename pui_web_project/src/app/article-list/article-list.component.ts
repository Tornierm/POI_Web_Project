import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Article } from '../interfaces/article';
import { User } from '../interfaces/user';
import { DummyServiceService } from '../services/dummy-service.service';
import { Category } from '../enums/enums';
import { LoginService } from '../services/login.service';
import { NewsService } from '../services/news.service';
import { Observable, catchError } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  Category: typeof Category = Category;
  
  constructor(
    private newsService: NewsService,
    private loginService: LoginService,
    private _sanitizer: DomSanitizer,
    private router: Router,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getArticles()
    const tmpUser = localStorage.getItem("user");
    console.log(tmpUser? JSON.parse(tmpUser) : "not here")
    if(tmpUser){
      this.tmpUser = JSON.parse(tmpUser);
      this.loggedInUser = this.tmpUser;
      this.isLogged = true;
      console.log(this.loggedInUser);
      console.log(this.isLogged)
    }
    // Without subscription
    //this.value = this.route.snapshot.paramMap.get('value'); 
  }

  articles: Article [] = [];

  getArticles(){
    this.newsService.getArticles().pipe(
      catchError(this.handleError)
    ).subscribe(
      data => {
        console.log(data)
        this.articles = data
      },
      () => console.log("process complete"),
    )
  }

  newArticle(){
    this.router.navigate([`/edit/${null}`, {}]);
  }

  editArticle(id: number){
    this.router.navigate([`/edit/${id}`, {}]);
  }

  openModel(){
    debugger
    const divModal = document.getElementById('myModal');
    if(divModal != null){
      divModal.style.display = 'block';
    }
    
  }

  closeModel(){
    const divModal = document.getElementById('myModal');
    if(divModal != null){
      divModal.style.display = 'none';
    }
    
  }

  deleteArticle(id: number){
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to delete this article?' },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newsService.deleteArticle(Number(id)).pipe(
          catchError(this.handleError)
        ).subscribe(
          () => {
            console.log("process complete"),
            this.update()
            
          }
        )
        window.alert("This article has been deleted successfully.");
      }
    }) 
    
  }


  loginFailed: boolean = false;
  handleError(err: HttpErrorResponse): Observable<never>{
    if(err.status == 401){
      this.loginFailed = true;
    }
    else{
    window.alert("An Error occured:" + err.message);
    }
    throw new Error('Method not implemented.');
  }


  searchTerm: string = "";

  category: Category = Category.All;

  setCategory(category: Category){
    this.category = category;
  }

  loggedInUser: User | null = this.loginService.getUser();

  isLogged: boolean = this.loginService.isLogged();

  update(){
    this.getArticles();
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
    this.loginService.login(this.tmpUser.username, this.tmpUser.passwd).subscribe(
      (data) => {
        const UserString = JSON.stringify(data);
        localStorage.setItem("user", UserString);
        this.update()
      },
      (error) => {
        this.handleError(error);
      },
      () => {
        console.log("process completed");
        this.loginFailed = false;
      }
    )
  }


  logout(){
    this.loginService.logout()
    localStorage.removeItem("user");
    this.update()
  }

}
