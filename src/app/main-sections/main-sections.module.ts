import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCartComponent } from './main-cart/main-cart.component'
import { MainSearchBarComponent } from './main-search-bar/main-search-bar.component'
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component'
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { MainSectionTemplatesComponent } from './main-section-templates/main-section-templates.component'






@NgModule({
  declarations: [
    MainCartComponent,
    MainSearchBarComponent,
    MainToolbarComponent,
    MainSectionTemplatesComponent


  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    MainToolbarComponent,
    MainSearchBarComponent,
    MainSectionTemplatesComponent


  ]
})
export class MainSectionsModule { }
