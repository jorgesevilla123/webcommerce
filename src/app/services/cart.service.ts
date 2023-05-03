import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { LoginService } from '../services/login.service'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {



  cartProducts: any = []
  count
  total = 0
  uri = 'http://localhost:4300/api/sessions'


  constructor(
    public loginService: LoginService,
    private http: HttpClient
  ) { }


  getCartProducts(): any {

    return this.loginService.selectedUser.length === 0 ? from([this.cartProducts]) :  from([this.loginService.selectedUser[0].cart])

  }

  



  addProductsToCart(product) {
    product.selected = true 
    if(this.loginService.selectedUser.length === 0){
      this.cartProducts.push(product)
      return from([{notUser: false}])
      

    }
    else {
      return this.http.post(`${this.uri}/add-to-cart`, 'nigga what')
    }
    // this.loginService.selectedUser.length === 0 ? this.cartProducts.push(product) : this.loginService.selectedUser[0].cart.push(product) 

  }



  deleteProductFromCart(product) {
    let index = this.loginService.selectedUser[0].cart.indexOf(product)

    this.loginService.selectedUser[0].cart.splice(index, 1)

  }


  


  deleteById(product) {
    let index = this.loginService.selectedUser[0].cart.findIndex(val => val.title === product.title)

    this.loginService.selectedUser[0].cart.splice(index, 1)
    return from([{ inCart: false }])

  }


  updateCount() {
    this.loginService.selectedUser.length === 0 ? this.count = this.cartProducts.length : this.count = this.loginService.selectedUser[0].cart.length

  }



  updateQuantity(product, quantity){
    console.log(this.loginService.selectedUser[0])
    let index = this.loginService.selectedUser[0].cart.findIndex(val => val.title === product.title)
    this.loginService.selectedUser[0].cart[index].quantity = quantity
  }



  calculateTotal() {
    console.log(this.cartProducts)
    this.total = 0

    if(this.loginService.selectedUser.length === 0){

      let productsSelected = this.cartProducts.filter( product => product.selected)

    productsSelected.forEach(
      product => {

        this.total += Number(product.quantity * product.precio)


      }
    )
    return this.total


    }
    else {
      let productsSelected = this.loginService.selectedUser[0].cart.filter( product => product.selected)

    productsSelected.forEach(
      product => {

        this.total += Number(product.quantity * product.precio)


      }
    )
    return this.total

    }

    


  }





  IncreaseTotal() {
    this.total = 0

    let productsSelected = this.loginService.selectedUser[0].cart.filter( product => product.selected)

    this.loginService.selectedUser[0].cart.forEach(
      product => {

        this.total += Number(product.quantity * product.precio)


      }
    )

    return this.total
  }




  decreaseTotal() {
    this.total = 0
    let productsSelected = this.loginService.selectedUser[0].cart.filter( product => product.selected)

    this.loginService.selectedUser[0].cart.forEach(
      product => {

        this.total -= (product.quantity * product.precio)


      }
    )

    return this.total * -1
  }









}
