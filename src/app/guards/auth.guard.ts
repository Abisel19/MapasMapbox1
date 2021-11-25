import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public estado: boolean | undefined;
  constructor(
    private authService: AuthService,
    private router: Router
  ){
    this.estado = authService.obtenerToken();
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.estado){
        this.router.navigateByUrl('/login')       
      return false;
      }else{
        return true;
      }

  }
  
}
