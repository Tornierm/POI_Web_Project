import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleEditionComponent } from './article-edition/article-edition.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryNationalFilterPipe } from './pipes/category-national-filter.pipe';
import { CategoryInternationalFilterPipe } from './pipes/category-international-filter.pipe';
import { CategoryEconomyFilterPipe } from './pipes/category-economy-filter.pipe';
import { CategorySportsFilterPipe } from './pipes/category-sports-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ArticleDetailsComponent,
    ArticleEditionComponent,
    ArticleListComponent,
    LoginComponent,
    CategoryNationalFilterPipe,
    CategoryInternationalFilterPipe,
    CategoryEconomyFilterPipe,
    CategorySportsFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
