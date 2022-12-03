import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { AlertService } from '../../shared/alert.service'




@Component({
  selector: 'app-products-description',
  templateUrl: './products-description.component.html',
  styleUrls: ['./products-description.component.scss']
})
export class ProductsDescriptionComponent implements OnInit {

  data: any

  quantities = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  selectedQuantity: any
  price: number = 19
  inCart: any



  constructor(
    public route: ActivatedRoute,
    public cartService: CartService,
    public  alert: AlertService

  ) { }







  ngOnInit(): void {
    
  
  this.selectedQuantity = this.quantities[0]


    this.route.queryParams.subscribe(
      val => {
        this.data = JSON.parse(val.d)
        console.log(this.data)
      }
    )




    this.checkCart()

  }









  


  checkCart(){
    console.log(this.data)
    let isInCart = this.cartService.cartProducts.some( product => product.category_name === this.data.category_name)
    this.inCart = isInCart
  }







  removeFromCart(){
    this.cartService.deleteById(this.data).subscribe(
      val => {
        this.inCart = val.inCart
      },
      err => {console.log(err)},
      () => 
      {this.cartService.updateCount()
        this.alert.notifySuccess('Producto eliminado del carrito', 800, 'top', 'center')
      }
    )
  }








  addToCart(){
    this.cartService.addProductsToCart(this.data)
    this.cartService.updateCount()
    this.checkCart()
    this.alert.notifySuccess('Producto agregado al carrito', 800, 'top', 'center')

  }




  updateQuantity(){
    this.cartService.updateQuantity(this.data, this.selectedQuantity)
    
    
  }

  





}
