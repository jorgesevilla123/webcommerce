import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCartComponent } from './main-cart/main-cart.component'
import { MainSearchBarComponent } from './main-search-bar/main-search-bar.component'
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component'
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { MainSectionTemplatesComponent } from './main-section-templates/main-section-templates.component';
import { BillingComponent } from './billing/billing.component';
import { ProductsModalComponent } from './products-modal/products-modal.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';





@NgModule({
  declarations: [
    MainCartComponent,
    MainSearchBarComponent,
    MainSectionTemplatesComponent,
    BillingComponent,
    ProductsModalComponent,
    LoginComponent,
    RegistrationComponent,
    UserDashboardComponent


  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [
   
    MainSearchBarComponent,
    MainSectionTemplatesComponent


  ]
})
export class MainSectionsModule { }
