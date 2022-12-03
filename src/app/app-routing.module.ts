import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main-sections/home/home.component';
import { MainCartComponent } from './main-sections/main-cart/main-cart.component';
import { CategoriesComponent } from './secondary-sections/categories/categories.component';
import { ProductsDescriptionComponent } from './secondary-sections/products-description/products-description.component';
import { SearchResultsComponent } from './secondary-sections/search-results/search-results.component';







const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: MainCartComponent},
  { path: 'sections', component: CategoriesComponent}, 
  { path: 'search', component: SearchResultsComponent},
  
  { path: 'product-details/:id', component: ProductsDescriptionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
