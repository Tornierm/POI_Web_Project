import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, catchError} from 'rxjs';
import * as _ from 'lodash';

import { Article, IndividualArticle, convertArticle } from '../interfaces/article';
import { User } from '../interfaces/user';
import { NewsService } from '../services/news.service';
import { LoginService } from '../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-article-edition',
  templateUrl: './article-edition.component.html',
  styleUrls: ['./article-edition.component.css']
})
export class ArticleEditionComponent implements OnInit {

  articleObs!: Observable<IndividualArticle>;
  article: IndividualArticle = {
    aut: 0,
    id: 0,
    id_user: 0,
    abstract: "",
    subtitle: "",
    body: "",
    update_date: new Date(),
    category: "",
    title: "",
    image_data: "",
    image_media_type: "",
    image_description: "",
    is_deleted: 0,
    is_public: 0,
    username: ""
  } ;
  
  @ViewChild('articleForm') articleForm: any;
  user!: User | null;
  
  cardImageBase64!: string;
  isImageSaved!: boolean;
  imageError!: string |null;

  id!: string;


  constructor(private newsService: NewsService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    ) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if(param){
      this.id = param;
    } else {
      this.id = "null";
    }
    if (this.id !== "null") {
      this.articleObs = this.newsService.getArticle(parseInt(this.id));
      this.articleObs.subscribe((article)=>{
        this.article = article;
        console.log("article: ")
        console.log(article)
      })
    }else{
      // new article
    }
  }

  setDate() {
    this.article.update_date = new Date();
  }

  getUser() {
    this.user = this.loginService.getUser();

    if (this.user != null) {
      this.article.id_user = this.user.user;
    }
  }

  back(){
    this.router.navigate([`/article-list`, {}]);
  }

  clearForm() {
    this.articleForm.reset();
  }

  handleError(err: HttpErrorResponse): void{
    window.alert("An Error occured:" + err.message);
  }

  saveArticle() {

    this.setDate();
    this.getUser();
    let newArticle;

    //check if article already exists
    if (this.article.id != 0) {
      //article exists
      newArticle = this.newsService.updateArticle(this.article).subscribe(
        (data) => {
          console.log(data);
          window.alert("The article" + this.article.title + "has been saved succesfully!");
          this.clearForm()
          this.back()
        },
        (error) => {
          this.handleError(error)
        },
        () => {
          console.log("process completed");
        }
      )

    } else {
      //new article
      const tmp = convertArticle(this.article);
      this.newsService.createArticle(tmp).subscribe(
        (next) => {
          console.log(next);
          window.alert("The article" + this.article.title + "has been saved succesfully!");
          this.clearForm()
          this.back();
        },
        (error) => {
          this.handleError(error);
          this.back();
        },
        () => {
          console.log("process completed");
        }
      )
    }
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const MAX_SIZE = 20971520;
      const ALLOWED_TYPES = ['image/png', 'image/jpeg'];

      if (fileInput.target.files[0].size > MAX_SIZE) {
        this.imageError =
        'Maximum size allowed is ' + MAX_SIZE / 1000 + 'Mb';
        return false;
      }
      if (!_.includes(ALLOWED_TYPES, fileInput.target.files[0].type)) {
      this.imageError = 'Only Images are allowed ( JPG | PNG )';
      return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.isImageSaved = true;

          this.article.image_media_type = fileInput.target.files[0].type;
          const head = this.article.image_media_type.length + 13;
          this.article.image_data = e.target.result.substring(head, e.target.result.length);

        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
    return true;
  }
}
