import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { CategoriesComponent } from './categories/categories.component';
import { MainSectionsModule } from '../main-sections/main-sections.module';
import { LightningSectionComponent } from './lightning-section/lightning-section.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ProductsDescriptionComponent } from './products-description/products-description.component';
import { HerramientasSectionComponent } from './herramientas-section/herramientas-section.component';
import { LavadoraSectionsComponent } from './lavadora-sections/lavadora-sections.component';
import { MarcasComponent } from './marcas/marcas.component';
import { SecadoraSectionsComponent } from './secadora-sections/secadora-sections.component';
import { AutomotrizSectionsComponent } from './automotriz-sections/automotriz-sections.component';
import { SearchResultsComponent } from './search-results/search-results.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    LightningSectionComponent,
    PaginationComponent,
    ProductsDescriptionComponent,
    HerramientasSectionComponent,
    LavadoraSectionsComponent,
    MarcasComponent,
    SecadoraSectionsComponent,
    AutomotrizSectionsComponent,
    SearchResultsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MainSectionsModule
  ]
})
export class SecondarySectionsModule { }
