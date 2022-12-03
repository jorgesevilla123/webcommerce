import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';




@Injectable({
  providedIn: 'root'
})


export class ProductsService {

  API: any = 'http://localhost:4000/api/products';
  products: any






  productsTestData: Array<any> =  [
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



  searchForm: FormGroup = new FormGroup({
    product: new FormControl('')
  })




  constructor(
    public http: HttpClient
  ) { }



  



  getProducts(): Observable<any> {
    let api = `${this.API}/get-products`
    return this.http.get<any>(api).pipe(
      map( products => { return products})
    )
  }




  setProducts(){
    this.getProducts().subscribe(
      products => {
        this.products = products
      }
    )
  }






  searchProducts(query){
    let api = `${this.API}/search-products?q=${query}`
    return this.http.get<any>(api).pipe(
      map(productsMatch => {return productsMatch})
    )

  }






















}
