import { Injectable } from '@angular/core';








@Injectable({
  providedIn: 'root'
})
export class LoginService {
  logged = false 

  users = [
    {name: 'Jorge Sevilla', email: 'jsdelduca@gmail.com', password: 'Jorge2784', password2: 'Jorge2784', shipping_addresses: [
      
    ]},
    {name: 'Nicole Sardi', email: 'nicoles.ardi.ns@gmail.com', password: 'miwichi', password2: 'miwichi', shipping_addresses: [
      
    ]}
  ]


  constructor() { }



  setLogin(){
    this.logged = true
  }




  isLogged(){
    return this.logged
  }


  setLogout(){
    this.logged = false
  }


  

}
