import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import{User}from '../../models/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
  // register(){
  //   this.httpVar.post<User>('http://localhost:8002/api/register',this.usuario).subscribe(data=>{
  //     setTimeout(()=>{
  //       // localStorage.setItem('currentToken', JSON.stringify({ token: data['token']}));
  //     },1000);
  //   })
  //   this.auth.registro(this.usuario);
  //   const tuto = localStorage.setItem('tutorial', 'Como utilizar el LocalStorage en Angular');
  //   this.auth.obtenerToken();
  //   console.log(this.usuario);
  // }
  
  register() {
    this.auth.registro(this.usuario);
    // this.httpVar.post<User>('http://localhost:8000/api/register',this.usuario).subscribe(
    //  data =>{
    //   this.router.navigateByUrl('/login', { replaceUrl: true });
    //   localStorage.setItem('currentToken', JSON.stringify({ token: data['token']}));
    //  }
    // );
    // try {
    // //console.log(this.usuario);
    // this.httpVar.post<User>('http://127.0.0.1:8000/api/register',this.usuario)
    // .subscribe(data=>{

    //   setTimeout(() => {
    //   // localStorage.setItem('currentId', JSON.stringify({ token: data['id']}));
    //   localStorage.setItem('currentToken', JSON.stringify({ token: data['token']}));
 
    //   console.log(data['token']);
    //   window.location.reload();
    // }, 1000);


    // },
    // error=>{
    //   setTimeout(() => {
    //   }, 1000);
      
    // });
    
    // } catch (error) {
    //   setTimeout(() => {
    //   }, 1000);
     

    // }
  }

}
