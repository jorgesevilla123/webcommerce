import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {



  cartProducts: any = []
  count
  total = 0

  constructor() { }


  getCartProducts(): Observable<any> {
    return from([this.cartProducts])
  }





  addProductsToCart(product) {
    this.cartProducts.push(product)

  }



  deleteProductFromCart(product) {
    let index = this.cartProducts.indexOf(product)

    this.cartProducts.splice(index, 1)

  }


  deleteById(product) {
    let index = this.cartProducts.findIndex(val => val.title === product.title)

    this.cartProducts.splice(index, 1)
    return from([{ inCart: false }])

  }


  updateCount() {
    this.count = this.cartProducts.length

  }



  updateQuantity(product, quantity) {
    let index = this.cartProducts.findIndex(val => val.title === product.title)
    this.cartProducts[index].quantity = quantity

  }



  calculateTotal() {
    this.total = 0

    this.cartProducts.forEach(
      product => {

        this.total += Number(product.quantity * product.precio)


      }
    )

    return this.total
  }





  IncreaseTotal() {
    this.total = 0

    this.cartProducts.forEach(
      product => {

        this.total += Number(product.quantity * product.precio)


      }
    )

    return this.total
  }




  decreaseTotal() {
    this.total = 0

    this.cartProducts.forEach(
      product => {

        this.total -= (product.quantity * product.precio)


      }
    )

    return this.total * -1
  }









}
