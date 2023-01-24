import { Component, OnInit } from '@angular/core';
import { ShippingModalComponent } from '../shipping-modal/shipping-modal.component'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'





@Component({
  selector: 'app-user-shipping',
  templateUrl: './user-shipping.component.html',
  styleUrls: ['./user-shipping.component.scss']
})
export class UserShippingComponent implements OnInit {

  constructor(
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    
  }



  addShipping(){
    let dialogRef = this.dialog.open(ShippingModalComponent)
    dialogRef.afterClosed().subscribe(
      val => {
        console.log('closed')
      }
    )

  }

}
