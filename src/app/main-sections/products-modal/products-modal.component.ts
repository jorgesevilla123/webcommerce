import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service'
@Component({
  selector: 'app-products-modal',
  templateUrl: './products-modal.component.html',
  styleUrls: ['./products-modal.component.scss']
})
export class ProductsModalComponent implements OnInit {

  cartProducts: any = []
  total

  constructor(
    public cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getCartProducts()
  }





  getCartProducts(){
    this.cartService.getCartProducts().subscribe(
      {
        next: (products) => { 
          this.cartProducts = products 
          this.total = this.cartService.calculateTotal()
        },
        error: (err) => { console.log(err) },
        complete: () => { }
      }
    )

  }

  increaseQuantity(product){
    let quantity = Number(product.quantity + 1)
    this.cartService.updateQuantity(product, quantity)
    this.total = this.cartService.IncreaseTotal()
    
  }

  decreaseQuantity(product){
    let quantity = Number(product.quantity -1)
    this.cartService.updateQuantity(product, quantity)
    this.total = this.cartService.decreaseTotal()

  }


  removeProduct(product){
    this.cartService.deleteProductFromCart(product)
    this.total = this.cartService.calculateTotal()

  }



}
