import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthuserGuard implements CanActivate {
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
      if(this.estado){
        this.router.navigateByUrl('/principal')    
        // window.location.reload();
      return true;
      }else{
        return false;
      }

  }
  
}
