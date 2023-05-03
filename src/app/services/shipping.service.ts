import { Injectable } from '@angular/core';
import {LoginService} from '../services/login.service'

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(
    public loginService: LoginService
  ) { }






  

  haveShipping(){
    return this.loginService.selectedUser[0].shipping_addresses.length > 0
  }





}
