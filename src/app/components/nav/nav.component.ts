import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public estado: boolean | undefined;
  constructor(
    public authService: AuthService, private router: Router

  ) { 
    
    this.estado = authService.obtenerToken();
  }

  ngOnInit(): void {
  }
  logout()
  {
    this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
    
  }
}
