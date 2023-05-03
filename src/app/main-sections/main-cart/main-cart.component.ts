import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service'
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../shared/alert.service'
import { LoginService } from '../../services/login.service'
import { MatCheckboxChange } from '@angular/material/checkbox';
import { productsCategory } from 'FOR-TEST/database-collections-test';

@Component({
  selector: 'app-main-cart',
  templateUrl: './main-cart.component.html',
  styleUrls: ['./main-cart.component.scss']
})
export class MainCartComponent implements OnInit {

  total: number

  deselected: boolean = false

  constructor(
    public cartService: CartService,
    public route: ActivatedRoute,
    public router: Router,
    public alert: AlertService,
    public loginService: LoginService
  ) { }

  cartProducts: any

  currentRate = 8;
  
  sections = [
    {
      section_name: 'Productos en el carrito', route: "/categories", query: 'iluminacion', all_button: 'Ver toda la iluminacion', cols: 4, rowHeight: '220px'
    }

  ]




  ngOnInit(): void {
    this.getCartProducts()
    this.total = this.cartService.calculateTotal()
 
  }

  isLoggedIn(){
    
  }


  
  increaseQuantity(product){

    console.log(product)
    let quantity = Number(product.quantity + 1)
    this.cartService.updateQuantity(product, quantity)
    product.selected ? this.total = this.cartService.IncreaseTotal() : this.total
    
  }

  decreaseQuantity(product){
    let quantity = Number(product.quantity - 1)
    this.cartService.updateQuantity(product, quantity)
    product.selected ? this.total = this.cartService.decreaseTotal() : this.total

  }

  selectProduct(checkbox, product){
   if(product.selected){
    console.log(product)
    product.selected = false
    this.allDeselected()
    this.total = this.cartService.calculateTotal()
   }
   else {
    product.selected = true
    console.log(product)
    this.allDeselected()
    this.total = this.cartService.calculateTotal()
   }
    // else {
    //   this.loginService.selectedUser[0].selectedCart.push(product)
    //   console.log(this.loginService.selectedUser[0].selectedCart)
    // }
  


  }



  allDeselected(){
    let allDeselected = this.cartProducts.every( product => {return product.selected === false}) 
    this.deselected = allDeselected
    console.log(allDeselected)
  }


  toggleAll(event: MatCheckboxChange) { 
    if(event.checked){
      console.log('products not checked')
      this.cartProducts.forEach( product => {
        if(product.selected === false){
          product.selected = true
        }
      })
          this.total = this.cartService.calculateTotal()
          this.allDeselected()
    }
    else {
      console.log('products checked')
      this.cartProducts.filter( product => {product.selected === true})
      this.cartProducts.forEach( product => {
        if(product.selected === true){
          product.selected = false
        }
      })
          this.total = this.cartService.calculateTotal()
          this.allDeselected()
      
    }

    
}




  getCartProducts(){
    this.cartService.getCartProducts().subscribe(
      val => {
        this.cartProducts = val
      }
    )

  }



  removeProduct(product){
    this.cartService.deleteProductFromCart(product)
    this.getCartProducts()
    this.alert.notifySuccess('Producto eliminado del carrito', 800, 'top', 'center')
    this.cartService.updateCount()
    this.total = this.cartService.calculateTotal()

  }




  updateQuantity(product){
    console.log(product)
    let route_data = JSON.stringify(product)
    let route = `/product-details/${product.title}?d=${route_data}`
    this.router.navigateByUrl(route)

  }




  















}
