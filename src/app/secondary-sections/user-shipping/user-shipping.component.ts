import { Component, OnInit } from '@angular/core';
import { ShippingModalComponent } from '../shipping-modal/shipping-modal.component'
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'
import { LoginService } from '../../services/login.service'
import { ShippingService } from '../../services/shipping.service'





@Component({
  selector: 'app-user-shipping',
  templateUrl: './user-shipping.component.html',
  styleUrls: ['./user-shipping.component.scss']
})
export class UserShippingComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public loginService: LoginService,
    public shippingService: ShippingService

  ) { }

  ngOnInit(): void {
    
  }



  addShipping(){
    let dialogConfig = new MatDialogConfig()
    dialogConfig.width = '25%'
    let dialogRef = this.dialog.open(ShippingModalComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(
      val => {
        if(val.AddedShipping){

          
        }
      }
    )

  }

  



}
