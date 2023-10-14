import { Injectable } from '@angular/core';
import { Article, IndividualArticle } from '../interfaces/article';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private newsUrl = 'http://sanger.dia.fi.upm.es/pui-rest-news/articles';  // URL to web api
  private articleUrl = 'http://sanger.dia.fi.upm.es/pui-rest-news/article';  // URL to web api

  constructor(private http: HttpClient) { }

  // Set the corresponding APIKEY accordig to the received by email
  private APIKEY: string = "";
  private APIKEY_ANON = 'ANON07_341';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'PUIRESTAUTH apikey=' + this.APIKEY_ANON
    })
  };

  // Modifies the APIKEY with the received value
  setUserApiKey(apikey: string) {
    this.APIKEY = apikey;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'PUIRESTAUTH apikey=' + this.APIKEY,
        'Access-Control-Allow-Origin': '*',
      })
    };
    console.log('Apikey successfully changed ' + this.APIKEY);
  }

  setAnonymousApiKey() {
    this.setUserApiKey(this.APIKEY_ANON);
  }

  // Returns the list of news contain elements with the following fields:
  // {"id":...,
  //  "id_user":...,
  //  "abstract":...,
  //  "subtitle":...,
  //  "update_date":...,
  //  "category":...,
  //  "title":...,
  //  "thumbnail_image":...,
  //  "thumbnail_media_type":...}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.newsUrl, this.httpOptions);
  }

  deleteArticle(article: Article | number): Observable<Article> {
    const id = typeof article === "number" ? article : article.id;
    const url = `${this.articleUrl}/${id}`;
    return this.http.delete<Article>(url, this.httpOptions);
  }


  // Returns an article which contains the following elements:
  // {"id":...,
  //  "id_user":...,
  //  "abstract":...,
  //  "subtitle":...,
  //  "update_date":...,
  //  "category":...,
  //  "title":...,
  //  "image_data":...,
  //  "image_media_type":...}


  getArticle(id: number): Observable<IndividualArticle> {
    console.log('Requesting article id=' + id);
    const url = `${this.articleUrl}/${id}`;
    let res = this.http.get<IndividualArticle>(url, this.httpOptions);
    console.log(res.subscribe(
      (data) => {
        console.log(data)
      }
    ))
    return res;

  }

  updateArticle(article: IndividualArticle): Observable<IndividualArticle> {
    console.log('Updating article id=' + article.id);
    console.log(article);
    return this.http.post<IndividualArticle>(this.articleUrl, article, this.httpOptions);
  }

  createArticle(article: Partial<IndividualArticle>): Observable<IndividualArticle> {
    console.log('Creating:');
    console.log(article);
    let res = this.http.post<IndividualArticle>(this.articleUrl, article, this.httpOptions);
    console.log(res)
    return res;
  }
}
