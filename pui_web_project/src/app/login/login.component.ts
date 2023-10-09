import { Component, OnInit } from '@angular/core';
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
  ){}

  tmpUser: User = {
    id: 0,
    username: "",
    passwd: "",
  };

  loggedInUser: User | null = this.loginService.getUser();

  isLogged: boolean = this.loginService.isLogged();

  ngOnInit(): void {
    
  } 

  update(){
    this.loggedInUser = this.loginService.getUser();
    this.isLogged= this.loginService.isLogged();
  }

  login(){
    console.log("login")
    this.loginService.login(this.tmpUser.username, this.tmpUser.passwd)
    this.update()
  }

  logout(){
    console.log("logout")
    this.loginService.logout()
    this.update()
  }
}
