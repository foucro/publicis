import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [

  {
    path: 'main',
    component: MainPageComponent
  },
  {
    path: 'panier',
    component: CartComponent
  },
  {
    path: '**',
    redirectTo:'main'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
