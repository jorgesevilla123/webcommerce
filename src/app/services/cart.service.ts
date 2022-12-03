import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {



  cartProducts: any = []
  count

  constructor() { }


  getCartProducts(): Observable<any>{
    return from([this.cartProducts])
  }





  addProductsToCart(product){
    this.cartProducts.push(product)
    console.log('Pushed succesfully')
    console.log(this.cartProducts)

  }



  deleteProductFromCart(product){
    let index = this.cartProducts.indexOf(product)
    console.log(index)
    this.cartProducts.splice(index,1)

  }


  deleteById(product){
    let index = this.cartProducts.findIndex( val => val.category_name === product.category_name)
    console.log(index)
    this.cartProducts.splice(index,1)
    return from([{inCart: false}])

  }


  updateCount(){
    this.count = this.cartProducts.length

  }



  updateQuantity(product, quantity){
    let index = this.cartProducts.findIndex( val => val.category_name === product.category_name)
    this.cartProducts[index].quantity = quantity
  }





}
