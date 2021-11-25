import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario : User;
  public err = Boolean;
   
    constructor( public auth: AuthService, public httpVar:HttpClient, private router: Router, 
    
  ) {
    this.usuario = {
      id: 0,
      name: '',
      email: '',
      telefono:'',
      rol: '',
      password: '',
      token: ''
    }
   }

  ngOnInit(): void {
  }
  login(){
    this.auth.login(this.usuario);
  }

}
