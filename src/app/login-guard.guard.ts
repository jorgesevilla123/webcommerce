import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../app/services/login.service'
import { AlertService } from '../app/shared/alert.service'

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(
    public loginService: LoginService,
    public alert: AlertService
  ){

  }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.loginService.isLogged()){
        console.log('logged in')
        return true
        
      }
      else {
        this.alert.notifyWarn('Algunos datos son incorrectos', 2000, 'top', 'center')
        return false
      }
    
  }
  



}
