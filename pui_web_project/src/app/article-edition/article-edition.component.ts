import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';

import { Article } from '../interfaces/article';
import { User } from '../interfaces/user';
import { NewsService } from '../services/news.service';
import { LoginService } from '../services/login.service';
import { DummyServiceService } from '../services/dummy-service.service';


@Component({
  selector: 'app-article-edition',
  templateUrl: './article-edition.component.html',
  styleUrls: ['./article-edition.component.css']
})
export class ArticleEditionComponent implements OnInit {

  article: Article = {
    id: 11,
    id_user: 12,
    abstract: "Short Abstract",
    subtitle: " It is a subtitle",
    body: " Count the body of the article in",
    update_date: new Date(),
    category: "Sports",
    title: "The dark side of sports",
    image_data: "url",
    image_media_type: "something",
    imageError: "",
    isImageSaved: false,
    cardImageBase64: "",

  }
    ;
  @ViewChild('articleForm') articleForm: any;
  existingArticle!: Observable<Article>;
  user!: User | null;
  
  cardImageBase64!: string;
  isImageSaved!: boolean;
  imageError!: string |null;

  id!: string | null;


  constructor(private newsService: NewsService,
    private loginService: LoginService,
    private dummyService: DummyServiceService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id != null) {
      this.article.id = parseInt(this.id);
      this.article = this.dummyService.getArticle(this.article.id);
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
      this.article.id_user = this.user.id;
    }
  }

  getID() {
    this.article.id = Math.random();
  }

  saveArticle() {
    this.setDate();
    this.getUser();

    if(this.article.image_data == null){
      this.article.image_data = "https://media.istockphoto.com/id/937170838/de/vektor/fernsehen-test-muster-aus-streifen.jpg?s=612x612&w=0&k=20&c=7UB3mSLlGW73opaNA05lUyOs_I-h4q-MbZoSycFG-9k="
    }

    //check if article already exists
    if (this.newsService.getArticle(this.article.id) != null) {
      //article exists
      this.newsService.updateArticle(this.article);

    } else {
      //new article
      this.getID();
      this.newsService.createArticle(this.article);
      
    }

    window.alert("The article" + this.article.title + "has been saved succesfully!");
  }

  clearForm() {
    this.articleForm.reset();
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
