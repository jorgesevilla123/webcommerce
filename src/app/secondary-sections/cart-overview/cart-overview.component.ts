import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav'
import { CartService } from '../../services/cart.service'




@Component({
  selector: 'app-cart-overview',
  templateUrl: './cart-overview.component.html',
  styleUrls: ['./cart-overview.component.scss']
})
export class CartOverviewComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatDrawer

  cartProducts: any = []
  total

  constructor(
    public cartService: CartService

  ) { }

  ngOnInit(): void {
  }


  open() {
 
    this.cartService.getCartProducts().subscribe(
      {
        next: (products) => {
           this.cartProducts = products 
           this.total = this.cartService.calculateTotal()
          },
        error: (err) => { console.log(err) },
        complete: () => {    this.sidenav.open()}
      }
    )

  }


  increaseQuantity(product){
    let quantity = Number(product.quantity + 1)
    this.cartService.updateQuantity(product, quantity)
    this.total = this.cartService.IncreaseTotal()
    
  }

  decreaseQuantity(product){
    let quantity = Number(product.quantity - 1)
    this.cartService.updateQuantity(product, quantity)
    this.total = this.cartService.decreaseTotal()

  }


  closeDrawer() {

  }



  detailedCart(){
    
  }



  removeProduct(product){
    this.cartService.deleteProductFromCart(product)
    this.total = this.cartService.calculateTotal()

  }





}
