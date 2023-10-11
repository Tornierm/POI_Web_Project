import { Component, effect } from '@angular/core';
import { DummyServiceService } from '../services/dummy-service.service';
import { Category } from '../enums/enums';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  category: string = Category.All;

  searchterm: string = "";

  Category: typeof Category = Category;
  
  constructor(
    private loginService: DummyServiceService,
  ){
    effect(() => {
      this.isLogged = this.loginService.isLogged()
    });
  }

  isLogged: boolean = this.loginService.isLogged();

  setCategory(category: Category){
    this.category = category;
  }
}
