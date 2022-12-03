import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { MatOptionSelectionChange } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getCategories } from 'FOR-TEST/products-management'
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { AlertService } from 'src/app/shared/alert.service';


@Component({
  selector: 'app-automotriz-sections',
  templateUrl: './automotriz-sections.component.html',
  styleUrls: ['./automotriz-sections.component.scss']
})
export class AutomotrizSectionsComponent implements OnInit {

  filters = new FormControl(null);
  sort = new FormControl('');
  categoryValues: Array<any> = []


  matchExist: boolean
  isFiltering: boolean
  page_name: any



  sections_template: Array<any> = [
    { category_name: 'Evaporadores', category_id: [1],  route:"/categories", query: 'evaporador-auto',  img_src: '../assets/bombillo 15w.jpeg', img_w: '100px', img_h: '100px'},
    { category_name: 'Condensadores', category_id: [2],  route: "/categories",  query: 'condensador-auto',img_src: '../assets/bombillo dicroico.jpeg', img_w: '100px', img_h: '100px'},
    { category_name: 'Sellos autommotriz', category_id: [6], route: "/categories",  query: 'sello-auto', img_src: '../assets/bombillo emergencia.jpeg', img_w: '100px', img_h: '100px'},
    { category_name: 'Deshidratadores', route: "/categories",  category_id: [6],   query: 'deshidratador-auto', img_src: '../assets/ip66.jpeg', img_w: '100px', img_h: '100px'},
    { category_name: 'Blowers', category_id: [],  route: "/categories", query: 'blower-auto', img_src: '../assets/lampara cuadrada.jpeg', img_w: '100px', img_h: '100px'},
    { category_name: 'Presostatos automotriz', category_id: [5], route: "/categories",  query: 'presostato-auto', img_src: '../assets/lampara redonda.jpeg', img_w: '100px', img_h: '100px'},
    { category_name: 'Rolineras automotriz', category_id: [], route:  "/categories",  query: 'rolinera-auto',img_src: '../assets/lampara redonda.jpeg', img_w: '100px', img_h: '100px'},
    { category_name: 'Valvulas block', category_id: [3],  route:"/categories",  query: 'valvula-block', img_src: '../assets/lampara redonda.jpeg', img_w: '100px', img_h: '100px'},
  ]




  sectionsToRender: any
  categories: any;
  categoryChips: any = []
  sortList = [
    'menor precio a mayor precio',
    'mayor precio a menor precio'
  ]


  

  sections = [
    {
      section_name: 'Iluminacion', route: "/categories", query: 'iluminacion', all_button: 'Ver toda la iluminacion', cols: 4, rowHeight: '220px'
    }

  ]

  routeData: any
  category: any
  currentPage: any
  totalItems: any







  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public cartService: CartService,
    public alert: AlertService,
    public productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.isFiltering = true
    this.matchExist = true

    console.log(this.router.url)
    this.sectionsToRender = this.sections_template

   

    this.totalItems = this.sections_template.length




    getCategories('Automotriz').subscribe(
      val => {
        this.categories = val.category_data
      }
    )

    
    this.route.queryParams.subscribe(
      val => {
        console.log(val)
        this.routeData = {route: '/sections', queryParams: this.router.url}
        this.category = val.category
        this.page_name = val.section
        this.currentPage = val.page

      }
    )





  }




  filterCategory(value) {


    if (value.length === 0) {
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



  filterByPrice(value) {

  }





  optionHandler(value: MatOptionSelectionChange) {


    if (value.source.selected === false) {
      let index = this.categoryValues.indexOf(value.source.value.id)
      // prevents that the remove function is executed again when the onChangeSelection function triggers on filter deselection
      if (index === -1) {
        return
      }
      else {
        //removes the product filter
        this.remove({ id: value.source.value.id, name: value.source.value.label_value, mat_select: value })
      }

    }

    else {


      console.log(value)


      this.categoryChips.push({ id: value.source.value.id, name: value.source.value.label_value, mat_select: value })


      let label_value = value.source.value.id
      this.categoryValues.push(label_value)

      this.filter()

    }
  }




  remove(category) {
    console.log(category.id)
    console.log(this.categoryChips)

    let index = this.categoryChips.indexOf(category)
    console.log(index)
    this.categoryChips.splice(index, 1)

    let categoryIndex = this.categoryValues.indexOf(category.id)
    console.log(categoryIndex)
    this.categoryValues.splice(categoryIndex, 1)
    category.mat_select.source.deselect()

    if (this.categoryValues.length > 0) {

      this.filter()


    }
    else {
      this.isFiltering = true
      this.matchExist = true
      this.sectionsToRender = this.sections_template

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






  



  getDescription(data) {
    console.log(data)
    let route_data = JSON.stringify(data)
    let route = `/${data.route}/${data.category_name}?d=${route_data}`
    this.router.navigateByUrl(route)

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
