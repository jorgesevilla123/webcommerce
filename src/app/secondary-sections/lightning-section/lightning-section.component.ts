












// finish categories implementation of this section











import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup } from '@angular/forms'

import { getCategories } from 'FOR-TEST/products-management'
import { MatOptionSelectionChange } from '@angular/material/core';
import { CartService } from '../../services/cart.service'
import { AlertService } from '../../shared/alert.service'
import { ProductsService } from '../../services/products.service'
import { CartOverviewComponent } from '../cart-overview/cart-overview.component'

















@Component({
  selector: 'app-lightning-section',
  templateUrl: './lightning-section.component.html',
  styleUrls: ['./lightning-section.component.scss']
})
export class LightningSectionComponent implements OnInit {
  @ViewChild(CartOverviewComponent) cartDrawer: CartOverviewComponent
  @Input() data: any




  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public cartService: CartService,
    public alert: AlertService,
    public productService: ProductsService

  ) { }



  isMobile: boolean
  pager: any






  matchExist: boolean
  isFiltering: boolean

  categoryValues: Array<any> = []


  filters = new FormControl(null);

  sort = new FormControl('');

  categoryFilterForm = new FormControl('');

  categoryChips: any = []

  filterValues: any = []


  categories: any

  totalItems: any

  currentPage

  routeData: any

  sortList = [
    'menor precio a mayor precio',
    'mayor precio a menor precio'
  ]
  pageName: any






  sectionsToRender: any


  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;




  sections_template: Array<any> = [
    { category_name: 'Embraco', category_id: [1], capacity: '12w', route: "/product-details", query: 'bombillos', img_src: '../assets/embraco.png', img_w: '180px', img_h: '100px', quantity: 20 },
    { category_name: 'Frigidaire', category_id: [3], capacity: '12w', route: "/product-details", query: 'bombillos', img_src: '../assets/frigidaire.png', img_w: '180px', img_h: '100px', quantity: 20 },
    { category_name: 'Whirlpool', category_id: [2], capacity: '15w', route: "/product-details", query: 'dicroicos', img_src: '../assets/whirlpool.png', img_w: '180px', img_h: '100px', quantity: 20 },

    { category_name: 'Embraco', category_id: [1], capacity: '12w', route: "/product-details", query: 'bombillos', img_src: '../assets/embraco.png', img_w: '180px', img_h: '100px', quantity: 20 },
    { category_name: 'Frigidaire', category_id: [3], capacity: '12w', route: "/product-details", query: 'bombillos', img_src: '../assets/frigidaire.png', img_w: '180px', img_h: '100px', quantity: 20 },
    { category_name: 'Whirlpool', category_id: [2], capacity: '15w', route: "/product-details", query: 'dicroicos', img_src: '../assets/whirlpool.png', img_w: '180px', img_h: '100px', quantity: 20 },

    { category_name: 'Embraco', category_id: [1], capacity: '12w', route: "/product-details", query: 'bombillos', img_src: '../assets/embraco.png', img_w: '180px', img_h: '100px', quantity: 20 },
    { category_name: 'Frigidaire', category_id: [3], capacity: '12w', route: "/product-details", query: 'bombillos', img_src: '../assets/frigidaire.png', img_w: '180px', img_h: '100px', quantity: 20 },
    { category_name: 'Whirlpool', category_id: [2], capacity: '15w', route: "/product-details", query: 'dicroicos', img_src: '../assets/whirlpool.png', img_w: '180px', img_h: '100px', quantity: 20 },

    { category_name: 'Embraco', category_id: [1], capacity: '12w', route: "/product-details", query: 'bombillos', img_src: '../assets/embraco.png', img_w: '180px', img_h: '100px', quantity: 20 },
    { category_name: 'Frigidaire', category_id: [3], capacity: '12w', route: "/product-details", query: 'bombillos', img_src: '../assets/frigidaire.png', img_w: '180px', img_h: '100px', quantity: 20 },
    { category_name: 'Whirlpool', category_id: [2], capacity: '15w', route: "/product-details", query: 'dicroicos', img_src: '../assets/whirlpool.png', img_w: '180px', img_h: '100px', quantity: 20 },

    { category_name: 'Embraco', category_id: [1], capacity: '12w', route: "/product-details", query: 'bombillos', img_src: '../assets/embraco.png', img_w: '180px', img_h: '100px', quantity: 20 },
    { category_name: 'Frigidaire', category_id: [3], capacity: '12w', route: "/product-details", query: 'bombillos', img_src: '../assets/frigidaire.png', img_w: '180px', img_h: '100px', quantity: 20 },
    { category_name: 'Whirlpool', category_id: [2], capacity: '15w', route: "/product-details", query: 'dicroicos', img_src: '../assets/whirlpool.png', img_w: '180px', img_h: '100px', quantity: 20 },

    { category_name: 'Embraco', category_id: [1], capacity: '12w', route: "/product-details", query: 'bombillos', img_src: '../assets/embraco.png', img_w: '180px', img_h: '100px', quantity: 20 },
    { category_name: 'Frigidaire', category_id: [3], capacity: '12w', route: "/product-details", query: 'bombillos', img_src: '../assets/frigidaire.png', img_w: '180px', img_h: '100px', quantity: 20 },
    { category_name: 'Whirlpool', category_id: [2], capacity: '15w', route: "/product-details", query: 'dicroicos', img_src: '../assets/whirlpool.png', img_w: '180px', img_h: '100px', quantity: 20 },

  ]








  sections = [
    {
      section_name: 'Iluminacion', route: "/categories", query: 'iluminacion', all_button: 'Ver toda la iluminacion', cols: 4, rowHeight: '220px'
    }

  ]




  category: any
  page_name: any
  page: any
  completed = false




  ngOnInit(): void {
    this.pageName = 'iluminacion'






    // add page this.currentPage

    this.isFiltering = true
    this.matchExist = true
    getCategories('iluminacion').subscribe(
      val => {
        this.categories = val.category_data
        // this.categories = val
      }
    )




    this.route.queryParams.subscribe(
      val => {
        this.currentPage = val.page
        this.getProducts('iluminacion', this.currentPage)
        setTimeout( () => {
          this.completed = true

        }, 500)

      }
    )
  }





  getProducts(category, page) {
    this.productService.getProductsCategory(category, page).subscribe(
      pager => {
        this.pager = pager
        this.sectionsToRender = pager.pageOfItems
      }
    )

  }











  getDescription(data) {
    let route_data = JSON.stringify(data)
    let route = `/${data.route}/${data.category_name}?d=${route_data}`
    this.router.navigateByUrl(route)

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
      const reg = new RegExp(string, 'gi');
      let matchedSection = this.sections_template.filter(
        ({ category_name }) => category_name.match(reg)
      )
      this.sectionsToRender = matchedSection

    }




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



      this.categoryChips.push({ id: value.source.value.id, name: value.source.value.label_value, mat_select: value })


      let label_value = value.source.value.id
      this.categoryValues.push(label_value)



      this.filter()
      this.isFiltering = true
      this.matchExist = true


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






  remove(category) {


    let index = this.categoryChips.indexOf(category)

    this.categoryChips.splice(index, 1)

    let categoryIndex = this.categoryValues.indexOf(category.id)

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










  checkCart(product) {
    let isInCart = this.cartService.cartProducts.some(productFound => productFound.title === product.title)
    if (isInCart) {
      return true
    }
    else {
      return false
    }
  }











  filter() {
    let filterValues = new Set(this.categoryValues)


    let matched = this.sections_template.filter(value =>
      value.category_id.some(n => filterValues.has(n))
    )

    if (matched.length === 0) {
      this.isFiltering = true
      this.matchExist = false
    }

    else {

      this.sectionsToRender = matched
      this.isFiltering = true
      this.matchExist = true
    }
  }



  sortByPrice() {


    //add prices to implement price filter



    // this.sections_template = this.sections_template.sort(() )
  }



  addToCart(product) {
    product.quantity = 1
    this.cartService.addProductsToCart(product)
    this.cartService.updateCount();
    this.cartDrawer.open()
  }



  removeFromCart(product) {
    this.cartService.deleteById(product)
    this.checkCart(product)
    this.cartService.updateCount()
    this.alert.notifySuccess('Producto eliminado del carrito', 800, 'top', 'center');
  }
















}
