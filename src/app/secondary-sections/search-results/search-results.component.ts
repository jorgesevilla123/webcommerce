import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service'
import { AlertService } from 'src/app/shared/alert.service';
import { FormControl } from '@angular/forms'
import { getCategories } from 'FOR-TEST/products-management'
import { tap } from 'rxjs';
import { CartOverviewComponent } from '../cart-overview/cart-overview.component'
import { PaginationService } from '../../services/pagination.service'
import { PaginationComponent } from '../pagination/pagination.component'




@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
 @ViewChild(CartOverviewComponent) cartDrawer: CartOverviewComponent
 @ViewChild(PaginationComponent) paginate: PaginationComponent  
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
  isMobile: boolean
  pager: any
  completed: boolean = false







  constructor(
    private router : Router,
    private route: ActivatedRoute,
    public productsService: ProductsService,
    public cartService: CartService,
    public alert: AlertService,
    public paginationService: PaginationService
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
        this.searchProducts(this.query, params.page)
      }
    )
  }









  searchProducts(query, page){
    this.productsService.searchProducts(query, page).subscribe(
      val => {
        this.resultsLength = val.pageOfItems.length
        this.products = val.pageOfItems
        this.paginationService.setPager(val)
        this.getPager()
        setTimeout(() => {
          this.completed = true
        }, 200)
      }
    )
  }







  getPager(){
    this.paginationService.getPager().subscribe(
      pager => {
        this.pager = pager
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
    product.quantity = 1
    this.cartService.addProductsToCart(product)
    this.cartService.updateCount();
    this.cartDrawer.open()
  }





  removeFromCart(product){
    this.cartService.deleteById(product)
    this.checkCart(product)
    this.cartService.updateCount()
    this.alert.notifySuccess('Producto eliminado del carrito', 800, 'top', 'center');
  }












}




