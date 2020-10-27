import { Component, OnInit, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { BookService,Offer } from '../service/book.service';
import { Book } from '../model/book';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  promo: Offer;
  booksInCart: Book[]
  price: number;
  promoMessage: string = "";
  showVid = false;

  constructor(private bookserv: BookService) { }

  ngOnInit(): void {
    this.booksInCart= this.bookserv.getBooksInCart();
    if (this.booksInCart?.length)
    this.bookserv.getPromo().subscribe(x=>
      {this.promo = x;
        this._setPromoMessage(x)})

      this.price = this.booksInCart.map((x) => x.price*x.nb)
      .reduce((a, b) => a + b, 0);

  }
  private _setPromoMessage(x: Offer) {
    let val = '';
    switch (x.type) {
      case 'percentage':
       val = `Réduction de ${x.value}%`;
       break
      case 'minus':
    
    val = `Remise immédiate de €${x.value} `
       break
      case 'slice':
       val = `Remise de €${x.value}  par tranche de ${x.sliceValue}`
       break;
      default:
        console.error('wrong offer type :',x.type)
        return ;
    }
    this.promoMessage = val;
  };
  
  
}
