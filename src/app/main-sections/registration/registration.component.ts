import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service'


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({
    name: new FormControl(''), 
    email: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl('')
  })

  constructor(
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
  }


  register(){
    let name = this.registrationForm.get('name').value
    let email = this.registrationForm.get('email').value
    let password = this.registrationForm.get('password').value
    let repeatPassword = this.registrationForm.get('repeatPassword').value
    console.log(name, email, password, repeatPassword)

    let user = this.loginService.users.find(
      val => val.email === email
    )
    
    if(password !== repeatPassword){
      console.log('Not the same password')
    }
    else {
      

      let passwordMatch = user.password === password

      passwordMatch ? this.loginService.setLogin() : this.loginService.setLogout()
     
    }
  }

}
