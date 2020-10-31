import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { CartComponent } from './cart/cart.component';
import { AboutComponent } from './about/about.component';

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
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    redirectTo:'main'
  },

];
const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  // ...any other options you'd like to use
};

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
