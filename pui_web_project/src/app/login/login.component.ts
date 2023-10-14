import { Component, OnInit, WritableSignal, effect } from '@angular/core';
import { User } from '../interfaces/user';
import { DummyServiceService } from '../services/dummy-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: DummyServiceService
  ){
    effect(() => {
      this.isLogged = this.loginService.isLogged()
    });  
  }

  tmpUser: User = {
    Authorization: "",
    expires:"",
    user: 0,
    group: 0,
    apikey: "",
    username: "",
    passwd: "",
  };

  loggedInUser: WritableSignal<User | null> = this.loginService.getUser();

  isLogged: boolean = this.loginService.isLogged();

  ngOnInit(): void {
    
  } 
 
  update(){
    this.loggedInUser = this.loginService.getUser();
    this.isLogged= this.loginService.isLogged();
  }

  login(){
    this.loginService.login(this.tmpUser.username, this.tmpUser.passwd)
    this.update()
  }

  logout(){
    this.loginService.logout()
    this.update()
  }
}
