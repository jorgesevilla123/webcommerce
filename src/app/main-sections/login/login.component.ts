import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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




  constructor() { }

  ngOnInit(): void {
  }




  submitLogin(){
    let email = this.loginForm.get('login').value
    let secret = this.loginForm.get('password').value
    console.log(email)
    console.log(secret)
  }

}
