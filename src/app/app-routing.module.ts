import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import{LoginComponent} from './components/login/login.component';
import{RegisterComponent} from './components/register/register.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthuserGuard } from './guards/authuser.guard';
import { PerfilComponent } from './components/perfil/perfil.component';

import { PrincipalComponent } from './components/principal/principal.component';
import { RutaComponent } from './components/ruta/ruta.component';


const routes: Routes = [
  {
    path: 'login',component: LoginComponent, canLoad: [ AuthuserGuard]
  },
  {
    path: 'register',component: RegisterComponent, canLoad: [ AuthuserGuard]
  },
  {
    path: 'home',component: HomeComponent,canActivate: [AuthGuard]
  },
  {
    path: 'inicio',component: InicioComponent, 
  },
  {
    path: 'ruta',component: RutaComponent
  },
  {
    path: 'principal',component: PrincipalComponent
  },
  {
    path: 'perfil',component: PerfilComponent, 
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
