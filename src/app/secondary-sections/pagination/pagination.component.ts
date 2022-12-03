import { Component, OnInit, Input } from '@angular/core';
import { PaginationService } from '../../services/pagination.service';
import { Router } from '@angular/router';








@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() totalItems: any
  @Input() currentPage: any
  @Input() routeData: any
  @Input() queryParamsData: any



  page: number
  




  pager

  constructor(  
    public paginationService: PaginationService,
    public router: Router
  ) { }

  ngOnInit(): void {

    this.page = this.currentPage
    this.paginate(this.totalItems,this.currentPage, 10)
  }







  paginate(totalItems: number, currentPage: any, pageSize: number, maxPages: number = 5){
    this.paginationService.paginate(totalItems, currentPage, pageSize, maxPages).subscribe(
      val => {
        this.pager= val
      }
    )
  }






  route(page){
    this.page = page
    console.log(this.routeData)
    let query = this.router.parseUrl(this.routeData.queryParams)
   query.queryParams.page = page
   let url = this.router.serializeUrl(query)
   this.router.navigateByUrl(`${url}`)
   this.paginate(this.totalItems, page, 10)

   
  }



  forwardButton(){
    
    let query = this.router.parseUrl(this.routeData.queryParams)
   let currentPageQuery = Number(query.queryParams.page)

    if(this.pager.totalPages === currentPageQuery){
      return 

    }

    else {
        
    
   let newPage = currentPageQuery + 1
   console.log(newPage)
   query.queryParams.page = newPage
   this.page = newPage
   
   let url = this.router.serializeUrl(query)
   this.router.navigateByUrl(`${url}`)
   this.paginate(this.totalItems, newPage, 10)



    }



  }

1
  backButton(){

    
    let query = this.router.parseUrl(this.routeData.queryParams)
   let currentPageQuery = Number(query.queryParams.page)


    if(currentPageQuery === 1){
      return

    }

    else {
      
   let newPage = currentPageQuery - 1
   console.log(newPage)
   query.queryParams.page = newPage
   this.page = newPage
   
   let url = this.router.serializeUrl(query)
   this.router.navigateByUrl(`${url}`)
   this.paginate(this.totalItems, newPage, 10)

    }



  }

}
