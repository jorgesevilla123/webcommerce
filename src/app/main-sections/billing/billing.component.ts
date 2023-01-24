import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ProductsModalComponent } from '../products-modal/products-modal.component'
import { LoginService } from '../../services/login.service'

interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  confirmationForm = new FormGroup({
    numero_confirmacion: new FormControl('')
  })



  shippingAddressForm = new FormGroup({
    avenida: new FormControl(''),
    calle: new FormControl(''),
    casa_apartamento: new FormControl(''),
    info_adicional: new FormControl('')
  })
  selectedValue: string;
  selectedCar: string;
  selectedState: String

  foods: Food[] = [
    {value: 'Zelle', viewValue: 'Zelle'},
    {value: 'Pago movil', viewValue: 'Pago movil'},
    {value: 'Transferencia', viewValue: 'Transferencia'},
  ];

  states = [
    {value: 'Zulia', viewValue: 'Zulia'},
    {value: 'Falcon', viewValue: 'Falcon'},
    {value: 'Aragua', viewValue: 'Aragua'},
  ];



  

  constructor(
    private _formBuilder: FormBuilder,
    public loginService: LoginService,
    public dialog: MatDialog) {}

 

  ngOnInit(): void {
  } 



  openCart(){
    console.log('hello')

  }


  openDialog(){
    this.dialog.open(ProductsModalComponent)
  }

}
