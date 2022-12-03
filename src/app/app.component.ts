import { Component, OnInit} from '@angular/core';
import { ProductsService } from './services/products.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

 

  constructor(
    private productService: ProductsService
  ){ }


  
  title = 'web';
  products: any = []




  ngOnInit(){
   this.getProducts()

   console.log(this.products)

   


  }




  getProducts(){
    this.productService.getProducts().subscribe(
      products => {
        let newProducts = Array(products)
        this.products = newProducts

        console.log(this.products)
      
      }
    )
  }
}
