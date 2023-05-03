import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { LoginService } from '../../services/login.service'
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'


@Component({
  selector: 'app-shipping-modal',
  templateUrl: './shipping-modal.component.html',
  styleUrls: ['./shipping-modal.component.scss']
})
export class ShippingModalComponent implements OnInit {

  constructor(
    public loginService: LoginService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ShippingModalComponent>
  ) { }

  ngOnInit(


  ): void {
  }



  states = [
    { value: 'Zulia', viewValue: 'Zulia' },
    { value: 'Falcon', viewValue: 'Falcon' },
    { value: 'Aragua', viewValue: 'Aragua' },
  ];


  addShipping(){
    this.loginService.addShipping()
    this.closeDialog()

  }


  closeDialog(){
    this.dialogRef.close({AddedShipping: true})
    
  }




}
