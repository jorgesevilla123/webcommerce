import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service'
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../shared/alert.service'

@Component({
  selector: 'app-main-cart',
  templateUrl: './main-cart.component.html',
  styleUrls: ['./main-cart.component.scss']
})
export class MainCartComponent implements OnInit {

  constructor(
    public cartService: CartService,
    public route: ActivatedRoute,
    public router: Router,
    public alert: AlertService
  ) { }

  cartProducts: any

  
  sections = [
    {
      section_name: 'Productos en el carrito', route: "/categories", query: 'iluminacion', all_button: 'Ver toda la iluminacion', cols: 4, rowHeight: '220px'
    }

  ]




  ngOnInit(): void {
    this.getCartProducts()
 
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

  }




  updateQuantity(product){
    console.log(product)
    let route_data = JSON.stringify(product)
    let route = `/${product.route}/${product.category_name}?d=${route_data}`
    this.router.navigateByUrl(route)

  }




  















}
