import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { Router } from '@angular/router'
import { CartService } from 'src/app/services/cart.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { UpdateModalComponent } from '../../shared/update-modal/update-modal.component'





@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  constructor(
    public loginService: LoginService,
    public router: Router,
    public cartService: CartService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }



  logout(){

    if(this.loginService.setLogout()){
      console.log('logged')

      this.cartService.updateCount()

      this.router.navigate(['/home'])

    }
  

  }


  openUpdateModal(title, value){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '400px'
    dialogConfig.data = {form: value, title: title}

    let dialogRef = this.dialog.open(UpdateModalComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      val => {
        console.log(val)
      }
    )



  }

}
