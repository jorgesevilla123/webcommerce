import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AlertService } from '../../shared/alert.service'
import { LoginService } from '../../services/login.service'
import { CartOverviewComponent } from '../cart-overview/cart-overview.component'
import { WebsocketService } from '../../services/websocket.service'





@Component({
  selector: 'app-products-description',
  templateUrl: './products-description.component.html',
  styleUrls: ['./products-description.component.scss']
})
export class ProductsDescriptionComponent implements OnInit, AfterViewInit {
  @ViewChild(CartOverviewComponent) cartDrawer: CartOverviewComponent
  @ViewChild('scrollFrame', {static: false}) scrollFrame: ElementRef;
  @ViewChild('chatForm') chatForm: ElementRef;
  @ViewChildren('message') messages: QueryList<any>;
  




  private scrollContainer: any
  private isNearBottom = true
  data: any;
  currentRate = 5;
  quantities = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  selectedQuantity: any
  price: number = 19
  inCart: any
  openMessage = false
  container: HTMLElement




  constructor(
    public route: ActivatedRoute,
    public cartService: CartService,
    public  alert: AlertService,
    public loginService: LoginService,
    public websocket: WebsocketService

  ) { }



  ngAfterViewInit(): void {
   
 
    this.messages.changes.subscribe( () => {
      this.scrollContainer = this.scrollFrame.nativeElement
     
     
      console.log('A message was sent')
      this.onMessagesChange()})
  }


  private onMessagesChange(): void {
    if(this.isNearBottom){
      this.scrollToBottom()

    }
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }



  private isUserNearBottom(): boolean {
    const threshold = 150
    const position = this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
    const height = this.scrollContainer.scrollHeight;
    console.log('position', position)
    console.log('height', height)
    return position > height - threshold
  }


  scrolled(event: any): void {
    console.log('scrolled')
    this.isNearBottom = this.isUserNearBottom()
  }







  ngOnInit(): void {
    console.log(this.loginService.selectedUser)

    
  



    this.route.queryParams.subscribe(
      val => {
        let product = JSON.parse(val.product)
       this.data = product
       console.log('passsed here')
       this.data.hasOwnProperty('quantity') ? this.selectedQuantity = this.data.quantity : this.selectedQuantity = 1
      }
    )

  }





  openChat(){
   
    this.websocket.connect()
    this.openMessage = true
    
  }

  closeChat(){
    this.openMessage = false
    this.websocket.close()
  }


  sendMessage(val){
    let message = {
      type: 'NEW_MESSAGE',
      payload: {
        author: this.loginService.selectedUser[0].email,
        message: `${val}`
      }
    }
   
    this.websocket.sendMessage(message)
    this.chatForm.nativeElement.reset()
  
  
    

  


  }









  


  checkCart(data){
    
    if(this.loginService.selectedUser.length === 0){
      let isInCart = this.cartService.cartProducts.some( productFound => productFound.title === data.title)
      if(isInCart){
        return true
      }
      else {
        return false
      }
    }
    else{
      let isInCart = this.loginService.selectedUser[0].cart.some(productFound => productFound.title === data.title)
    if (isInCart) {
      return true
    }
    else {
      return false
    }
    }
  }







  removeFromCart(){
    this.cartService.deleteById(this.data).subscribe(
      val => {
        this.inCart = val.inCart
      },
      err => {console.log(err)},
      () => 
      {this.cartService.updateCount()
        this.alert.notifySuccess('Producto eliminado del carrito', 800, 'top', 'center')
      }
    )
  }








  addToCart(){
    this.data.quantity = 1
    this.cartService.addProductsToCart(this.data)
    this.cartService.updateCount()
    this.checkCart(this.data)
    this.alert.notifySuccess('Producto agregado al carrito', 800, 'top', 'center')
    this.cartDrawer.open()

  }




  updateQuantity(){
    this.cartService.updateQuantity(this.data, this.selectedQuantity)
    
    
  }

  





}
