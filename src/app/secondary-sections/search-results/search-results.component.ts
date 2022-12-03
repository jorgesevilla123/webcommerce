import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service'
import { AlertService } from 'src/app/shared/alert.service';
import { FormControl } from '@angular/forms'
import { getCategories } from 'FOR-TEST/products-management'
import { map, mergeMap, of, tap } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  products: any
  query: any
  resultsLength: any
  totalItems: any
  currentPage: any = 1
  routeData: any = {route: '/sections', queryParams: this.router.url}
  categories: any 
  commonCategories 
  categoriesArr: any = []



  filters = new FormControl(null);







  constructor(
    private router : Router,
    private route: ActivatedRoute,
    public productsService: ProductsService,
    public cartService: CartService,
    public alert: AlertService
  ) { }

  ngOnInit(): void {









    getCategories('iluminacion').subscribe(
      val => {
        this.categories = val.category_data
        // this.categories = val
      }
    )

    
    this.totalItems = this.productsService.productsTestData.length


  
    this.route.queryParamMap.subscribe(
      ({params}: any) => {
        this.query = params.q
        this.productsService.searchProducts(params.q).pipe(
          tap(
            val => {
              this.resultsLength = val.length
              this.products = val
              
            }
          ),
        ).subscribe(
          val => {
            val.forEach(element => {
              console.log(element.categorias)
            
              this.categoriesArr.push(element.categorias[0])     
              console.log(this.categoriesArr)         
            });
          

          }
      
        )
      }
    )







  }







  
  checkCart(product){
    let isInCart = this.cartService.cartProducts.some( productFound => productFound.title === product.title)
    if(isInCart){
      return true
    }
    else {
      return false
    }
  }





  
  addToCart(product){
    console.log(product)
    product.quantity = 1
    this.cartService.addProductsToCart(product)
    this.cartService.updateCount();
    this.alert.notifySuccess('Producto agregado al carrito', 800, 'top', 'center')
  }





  removeFromCart(product){
    this.cartService.deleteById(product)
    this.checkCart(product)
    this.cartService.updateCount()
    this.alert.notifySuccess('Producto eliminado del carrito', 800, 'top', 'center');
  }












}




