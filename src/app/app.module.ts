import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DEFAULT_CURRENCY_CODE } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule,FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChevronRight,faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { CreditCardDirectivesModule } from 'angular-cc-library';


import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SmallCartComponent } from './small-cart/small-cart.component';
import { BookModalComponent } from './book-modal/book-modal.component';
import { CartComponent } from './cart/cart.component';
import { PayModalComponent } from './pay-modal/pay-modal.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    SmallCartComponent,
    BookModalComponent,
    CartComponent,
    PayModalComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    CreditCardDirectivesModule
  ],
  providers: [{provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'}],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private library: FaIconLibrary) {
  library.addIcons(faChevronRight,faShoppingCart);
}}
