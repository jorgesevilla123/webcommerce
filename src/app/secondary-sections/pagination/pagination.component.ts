import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { PaginationService } from '../../services/pagination.service';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';







@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges{


  @Input() isMobile: boolean
  @Input() pageName: any
  @Input() currentPage: any
  @Input() query:any

  @Output() pagination = new EventEmitter()
  @Output() setNoPaginator = new EventEmitter()



  @Input() pager: any
  pages: any





  page: number

  





  constructor(  
    public paginationService: PaginationService,
    public router: Router,
    public productService: ProductsService,
    public routing: ActivatedRoute
  ) { }

  ngOnInit(): void {

  
  }



  ngOnChanges(changes: SimpleChanges){
    if(changes.pager !== undefined){
      this.pager = changes.pager.currentValue
      this.pages = this.pager.pager.pages
  

    }
    else {
      return

    }
 
  }




 







  route(page){

    if(this.query !== undefined){
      this.productService.getProductsCategory(this.pageName, page).subscribe(
        {
          next: (val) => {
            this.pager = val
            console.log(this.pager)
            this.pagination.emit(val.pageOfItems)
            this.setNoPaginator.emit()
            this.router.navigate([`/search`], {queryParams: {q: this.query, page: page}})
          },
          error: (err) => {console.log(err)},
          complete: () => {
       
          }
        
        }
      )

    }

    else {
      this.productService.getProductsCategory(this.pageName, page).subscribe(
        {
          next: (val) => {
            this.pager = val
            console.log(this.pager)
            this.pagination.emit(val.pageOfItems)
            this.router.navigate([`/${this.pageName}`], {queryParams: { page: page}})
          },
          error: (err) => {console.log(err)},
          complete: () => {
       
          }
        
        }
      )

    }


  }








  forwardButton(){
    if(this.query !== undefined){
      let current = Number(this.currentPage)
      let next = current  + 1
      this.productService.getProductsCategory(this.query, next).subscribe(
        {
          next: (val) => {
            this.pagination.emit(val)
            this.currentPage = next
            this.pager = val
          },
          error: (err) => {console.log(err)},
          complete: () => {
            this.router.navigate([`/search`], {queryParams: {q: this.query, page: next}})
          }
        
        }
      )

    }
    else {
      let current = Number(this.currentPage)
      let next = current  + 1
      this.productService.getProductsCategory(this.query, next).subscribe(
        {
          next: (val) => {
            this.pagination.emit(val)
            this.currentPage = next
            this.pager = val
          },
          error: (err) => {console.log(err)},
          complete: () => {
            this.router.navigate([`/${this.pageName}`], {queryParams: { page: next}})
          }
        
        }
      )
      
    }
   
    
   
    
  

  }


  backButton(){
    if(this.query !== undefined){
      let previousPage = this.currentPage - 1
    
      this.productService.getProductsCategory(this.query, previousPage).subscribe(
        {
          next: (val) => {
            this.pagination.emit(val)
            this.currentPage = previousPage
            this.pager = val
          },
          error: (err) => {console.log(err)},
          complete: () => {
            this.router.navigate([`/search`], {queryParams: {q: this.query, page: previousPage}})
          }
        
        }
      )

    }
    else {
      let previousPage = this.currentPage - 1
    
      this.productService.getProductsCategory(this.query, previousPage).subscribe(
        {
          next: (val) => {
            this.pagination.emit(val)
            this.currentPage = previousPage
            this.pager = val
          },
          error: (err) => {console.log(err)},
          complete: () => {
            this.router.navigate([`/${this.pageName}`], {queryParams: {page: previousPage}})
          }
        
        }
      )
      
    }
   
    
   


  }

}
