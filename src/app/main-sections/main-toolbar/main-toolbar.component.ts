import { Component, OnInit, NgZone } from '@angular/core';
import { map } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { LoginService } from '../../services/login.service';










@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent implements OnInit {

  public products: any
  public productCount: any

  constructor(
    private productService: ProductsService,
    public cartService: CartService,
    public loginService: LoginService
  
  ) { }

  ngOnInit(): void {
    this.cartService.updateCount()
  }




}
