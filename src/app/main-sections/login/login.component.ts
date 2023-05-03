import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service'
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  
  loginForm: FormGroup = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  })




  constructor(
    public loginService: LoginService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }




  submitLogin(){
    let email = this.loginForm.get('login').value
    let secret = this.loginForm.get('password').value
    console.log(email)
    console.log(secret)

    let user = this.loginService.users.find(
      val => val.email === email
      
    )

    let passwordMatch = user.password === secret
    console.log(passwordMatch)

    if(passwordMatch){
      this.loginService.setLogin(user) 
      this.cartService.updateCount()

    }
    else {
      this.loginService.setLogout()

    }





  }

}