import { Injectable } from '@angular/core';
import{User}from '../models/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  cieoMs: any;
  estado: boolean | undefined;
  public token: string;

  constructor(public http:HttpClient,private router: Router) {
    this.obtenerToken();
   }
  //  obtenerToken(){
    
  //   if(JSON.parse(localStorage.getItem('currentToken'))){
  //     var currentToken = JSON.parse(localStorage.getItem('currentToken'));
  //   var token = currentToken.token; // your token 
  //   //console.log(token);  
  //   this.estado = true;
  //   }else{
  //     this.estado = false;
  //     //console.log("No hay token");
  //   }
  //   return this.estado;
  // }
    obtenerToken(){    
    const dato = localStorage.getItem('currentToken')
//Solo entra si no es nulo. 
    if(dato) {
      this.cieoMs=JSON.parse(dato)
      this.estado = true;
      this.isAuthenticated.next(true);
      console.log('entra');
      console.log(this.estado);
    //   if(this.cieoMs && this.cieoMs.value){
       
    //   }else{
    // this.isAuthenticated.next(false)

    //   }
    
    }
//si si
  else {
    this.estado = false;
    console.log(this.estado);

    this.isAuthenticated.next(false)
  console.log('sale');
  }
  return this.estado;

  }
  retornarToken(){
    if(JSON.parse(localStorage.getItem('currentToken'))){
    var currentToken = JSON.parse(localStorage.getItem('currentToken'));
    this.token = currentToken.token; // your token 
    //console.log(this.token);  
    }else{
      //console.log("No hay token");
    }
    return this.token;
  }
  registro(usuario: User){
    this.http.post<User>('https://enrique-dev.com/api/register',usuario).subscribe(data=>{
      setTimeout(()=>{
        this.router.navigate(['/principal']).then(()=>{
          window.location.reload();
        });
        
        localStorage.setItem('currentToken', JSON.stringify({ token: data['token']}));
        this.isAuthenticated.next(true);
        
      },1000);
    })
    
  }
  login(usuario: User){
    this.http.post<User>('https://enrique-dev.com/api/login',usuario).subscribe(data=>{
      setTimeout(()=>{
        this.router.navigate(['/principal']).then(()=>{
          window.location.reload();
        });
        localStorage.setItem('currentToken', JSON.stringify({ token: data['token']}));
        this.isAuthenticated.next(true);
       
        
      },1000);
    })
  }
  logout(){
    localStorage.clear();
    this.isAuthenticated.next(false);
    window.location.reload();

  }
}
