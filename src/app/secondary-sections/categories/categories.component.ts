import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  FormControl, FormGroup} from '@angular/forms'






@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {


  

  category: any
  page_name: any
  page: any = 1
  

  constructor(
    private router : Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      val => {
        console.log(val)
        this.category = val.category
        this.page_name = val.section
        this.page = val.page

      }
    )
  }

  someFunction(){}

}
