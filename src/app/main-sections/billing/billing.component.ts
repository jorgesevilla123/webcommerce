import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, RequiredValidator} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { LoginService } from '../../services/login.service'
import { ShippingModalComponent } from '../../secondary-sections/shipping-modal/shipping-modal.component'
import { ShippingService } from '../../services/shipping.service'



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


  selectedValue: string;
  selectedCar: string;
  selectedState: String
  selectedShipping: any
  paymentProcessed:any = 'waitingCode'






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
    public dialog: MatDialog,
    public shippingService: ShippingService
    ) {}

 


  ngOnInit(): void {
  } 



  selectShipping(radio, shipping){
    radio.checked ? (radio.checked = false, this.selectedShipping = undefined) : (radio.checked = true, this.selectedShipping = shipping)
    
  }



  openCart(){
    console.log('hello')

  }


  openDialog(){
    this.dialog.open(ShippingModalComponent)
  }


  validate(){
    this.paymentProcessed = 'processing'
    this.validated()
  }



  validated(){
    setTimeout(() => {
      this.paymentProcessed = 'processed'
    }, 4000)
  }

}
