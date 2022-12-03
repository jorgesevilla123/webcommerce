












// finish categories implementation of this section











import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl, FormGroup } from '@angular/forms'

import { getCategories } from 'FOR-TEST/products-management'
import { productsCategory } from 'FOR-TEST/database-collections-test';
import { MatOptionSelectionChange } from '@angular/material/core';
import { CartService } from '../../services/cart.service'
import { MainToolbarComponent } from '../../main-sections/main-toolbar/main-toolbar.component'
import { AlertService } from '../../shared/alert.service'
import { ProductsService } from '../../services/products.service'

















@Component({
  selector: 'app-lightning-section',
  templateUrl: './lightning-section.component.html',
  styleUrls: ['./lightning-section.component.scss']
})
export class LightningSectionComponent implements OnInit {


  

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public cartService: CartService,
    public toolbar: MainToolbarComponent,
    public alert: AlertService,
    public productService: ProductsService

  ) { }






matchExist: boolean
isFiltering: boolean 

  categoryValues: Array<any> = []


  filters = new FormControl(null);

  sort = new FormControl('');

  categoryFilterForm = new FormControl('');

  categoryChips: any = []

  filterValues: any = []


  categories: any 

  totalItems:  any

  currentPage

  routeData: any


  sortList = [
    'menor precio a mayor precio',
    'mayor precio a menor precio'
  ]




  sections_template: Array<any> =  [
    { category_name: 'Bombillo led 15w 110v e27', category_id: [3,6,9,10],  capacity: '12w',route: "/product-details", query: 'bombillos', img_src: '../assets/bombillo 15w.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Bombillo led 12w multivoltaje e27', category_id: [2,8,9,10],  capacity: '12w',route: "/product-details", query: 'bombillos', img_src: '../assets/bombillo 15w.jpeg', img_w: '100px', img_h: '100px',quantity: 20 },
    { category_name: 'Bombillo dicroico',category_id: [1,8,11],   capacity: '15w',route: "/product-details", query: 'dicroicos', img_src: '../assets/bombillo dicroico.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Tubos LED',category_id: [3,8,14],  capacity: '15w', route: "/product-details", query: 'Tubos LED', img_src: '../assets/bombillo emergencia.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Reflector led 80w', category_id: [4,6,16],  capacity: '12w',route: "/product-details", query: 'reflectores', img_src: '../assets/ip66.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Lampara cuadrada 24w', category_id: [4,8,10],  capacity: '12w',route: "/product-details", query: 'lamparas LED', img_src: '../assets/lampara cuadrada.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Lamparas empotrables',category_id: [4,8,13],   capacity: '15w',route: "/product-details", query: 'Lamparas empotrables', img_src: '../assets/lampara redonda.jpeg', img_w: '100px', img_h: '100px',quantity: 20 },
    { category_name: 'Lampara tungsteno', category_id: [5,8,13],  capacity: '12w',route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px',quantity: 20 },
    { category_name: 'Lampara UFO', category_id: [4,8,13], capacity: '12w', route: "/product-details", query: 'Lamparas ufo', img_src: '../assets/lampara UFO.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Reflector led 80w', category_id: [4,6,16], capacity: '12w', route: "/product-details", query: 'reflectores', img_src: '../assets/ip66.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Lampara cuadrada 24w',  category_id: [4,8,13], capacity: '15w',route: "/product-details", query: 'lamparas LED', img_src: '../assets/lampara cuadrada.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Lamparas empotrables', category_id: [1,8,13],  capacity: '12w',route: "/product-details", query: 'Lamparas empotrables', img_src: '../assets/lampara redonda.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Lampara tungsteno', category_id: [4,7,13],  capacity: '9w',route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Lampara UFO',category_id: [4,8,13],  capacity: '12w', route: "/product-details", query: 'Lamparas ufo', img_src: '../assets/lampara UFO.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Lamparas empotrables',category_id: [4,8,13],   capacity: '12w',route: "/product-details", query: 'Lamparas empotrables', img_src: '../assets/lampara redonda.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Lampara tungsteno', category_id: [5,8,13], capacity: '12w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Lampara UFO',category_id: [4,8,13],  capacity: '12w', route: "/product-details", query: 'Lamparas ufo', img_src: '../assets/lampara UFO.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Lamparas empotrables', category_id: [4,8,13],  capacity: '12w',route: "/product-details", query: 'Lamparas empotrables', img_src: '../assets/lampara redonda.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Lampara tungsteno', category_id: [5,8,13],  capacity: '9w',route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Lampara UFO',category_id: [4,8,13],  capacity: '15w', route: "/product-details", query: 'Lamparas ufo', img_src: '../assets/lampara UFO.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Lamparas empotrables', category_id: [4,8,13],  capacity: '12w',route: "/product-details", query: 'Lamparas empotrables', img_src: '../assets/lampara redonda.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Lampara tungsteno',category_id: [5,8,13],  capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Lampara UFO',  category_id: [4,8,13], capacity: '12w',route: "/product-details", query: 'Lamparas ufo', img_src: '../assets/lampara UFO.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },

  ]


  sectionsToRender: any


  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;


  



  sections = [
    {
      section_name: 'Iluminacion', route: "/categories", query: 'iluminacion', all_button: 'Ver toda la iluminacion', cols: 4, rowHeight: '220px'
    }

  ]


  

  category: any
  page_name: any
  page: any








  ngOnInit(): void {

    console.log(this.router.url)
   

    this.totalItems = this.productService.productsTestData.length




    
 
     // add page this.currentPage
    
    this.isFiltering = true
    this.matchExist = true
    getCategories('iluminacion').subscribe(
      val => {
        this.categories = val.category_data
        // this.categories = val
      }
    )


    this.sectionsToRender = this.sections_template


    this.route.queryParams.subscribe(
      val => {
        this.routeData = {route: '/sections', queryParams: this.router.url}
        this.category = val.category
        this.page_name = val.section
        this.currentPage = val.page

      }
    )
  }









  getDescription(data) {
    console.log(data)
    let route_data = JSON.stringify(data)
    let route = `/${data.route}/${data.category_name}?d=${route_data}`
    this.router.navigateByUrl(route)

  }










  filterCategory(value) {
    
      
    if(value.length === 0){
      const reg = new RegExp('', 'gi');
      let matchedSection = this.sections_template.filter(
        ({ category_name }) => category_name.match(reg)
      )
      this.sectionsToRender = this.sections_template
    }
    else {
      

      let string = value.join('|')
      console.log(string)
      const reg = new RegExp(string, 'gi');
      let matchedSection = this.sections_template.filter(
        ({ category_name }) => category_name.match(reg)
      )
      console.log(matchedSection)

      this.sectionsToRender = matchedSection

    }

    console.log(value)

   
    
  }



  filterByPrice(value){

  }





  optionHandler(value: MatOptionSelectionChange){
   

    if(value.source.selected === false){
      let index = this.categoryValues.indexOf(value.source.value.id)
      // prevents that the remove function is executed again when the onChangeSelection function triggers on filter deselection
      if(index === -1){
        return
      }
      else {
        //removes the product filter
        this.remove({id: value.source.value.id ,name: value.source.value.label_value, mat_select:value})
      }
    
    }

    else {
      

    console.log(value)


    this.categoryChips.push({id: value.source.value.id ,name: value.source.value.label_value, mat_select: value})
  
 
      let label_value = value.source.value.id
      this.categoryValues.push(label_value)

  
      
     this.filter()
     this.isFiltering = true
     this.matchExist = true
     console.log('passed here')

    }





    // if(value.length === 0){
    //   const reg = new RegExp('', 'gi');
    //   let matchedSection = this.sections_template.filter(
    //     ({ capacity }) => capacity.match(reg)
    //   )
    //   this.sectionsToRender = this.sections_template
    // }
    // else {
      

    //   let string = value.join('|')
    //   console.log(string)
    //   const reg = new RegExp(string, 'gi');
    //   let matchedSection = this.sections_template.filter(
    //     ({ capacity }) => capacity.match(reg)
    //   )
    //   console.log(matchedSection)

    //   this.sectionsToRender = matchedSection

    // }

  }






  remove(category){

    
    let index = this.categoryChips.indexOf(category)

    this.categoryChips.splice(index,1)
 
   let categoryIndex = this.categoryValues.indexOf(category.id)

   this.categoryValues.splice(categoryIndex,1)


   category.mat_select.source.deselect()


   if(this.categoryValues.length > 0){

    this.filter()

    
   }
   else {
    this.isFiltering = true
    this.matchExist = true
    this.sectionsToRender = this.sections_template

   }

  





  }




    


  checkCart(product){
    let isInCart = this.cartService.cartProducts.some( productFound => productFound.category_name === product.category_name)
    if(isInCart){
      return true
    }
    else {
      return false
    }
  }











  filter(){
    let filterValues = new Set(this.categoryValues)


    let matched = this.sections_template.filter( value => 
     value.category_id.some( n => filterValues.has(n))
    )

    if(matched.length === 0){
      this.isFiltering = true
      this.matchExist = false



    }

    else {
      
      this.sectionsToRender = matched
      this.isFiltering = true
      this.matchExist = true
    }
 
 
  }



  sortByPrice(){


    //add prices to implement price filter



    // this.sections_template = this.sections_template.sort(() )
  }



  addToCart(product){
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
