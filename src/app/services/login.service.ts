import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../services/cart.service'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';












@Injectable({
  providedIn: 'root'
})
export class LoginService {

  uri = 'http://localhost:4300/api/sessions'

  stateSelected: any

  selectedUser: any = []




  shippingAddressForm = new FormGroup({
    descripcion: new FormControl(''),
    avenida: new FormControl(''),
    calle: new FormControl(''),
    casa_apartamento: new FormControl(''),
    info_adicional: new FormControl('')
  })


  logged = false

  users = [
    {
      name: 'Jorge Sevilla', email: 'jsdelduca@gmail.com', password: 'Jorge2784', password2: 'Jorge2784', shipping_addresses: [], cart: [],
      
    },
    {
      name: 'Nicole Sardi', email: 'nicoles.ardi.ns@gmail.com', password: 'miwichi', password2: 'miwichi', shipping_addresses: [], cart: [],
      
    }
  ]


  constructor(
    private http: HttpClient
   
  
  ) { }


  setState(state){
    console.log(state)
    this.stateSelected = state.source.value
  }



  setLogin(user) {
    this.logged = true
    this.selectedUser.push(user)
  }




  isLogged() {
    return this.logged
  }


  setLogout() {
    this.selectedUser.pop()
    this.logged = false
    return true
  }



  addShipping() {
    //add validation
    let descripcion = this.shippingAddressForm.get('descripcion').value
    let avenida = this.shippingAddressForm.get('avenida').value
    let calle = this.shippingAddressForm.get('calle').value
    let  casa_apartamento = this.shippingAddressForm.get('casa_apartamento').value
    let  info_adicional = this.shippingAddressForm.get('info_adicional').value
    console.log(avenida, calle, casa_apartamento, info_adicional)
    let shipping = {
          descripcion: descripcion,
          avenida: avenida,
          calle: calle,
          casa_apartamento,
          info_adicional
    }
    this.selectedUser[0].shipping_addresses.push(shipping)

    console.log(this.selectedUser)
    

    
  }


  checkSession(){
    return this.http.get(`${this.uri}/check-session`)
  }

  


  createUser(user): Observable<any>{

    return this.http.post(`${this.uri}/create-user`, user)

  }






}
