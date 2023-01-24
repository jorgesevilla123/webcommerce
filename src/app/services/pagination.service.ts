import { Injectable } from '@angular/core';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
    pager: any

  constructor() { }




  setPager(pager){
    this.pager = pager

  }


  getPager(){
    return from([this.pager])
  }












}
