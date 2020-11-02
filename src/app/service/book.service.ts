import { Injectable } from '@angular/core';
import { Book } from '../model/book';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Offer } from '../model/Offer';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private suffixPromo = '/commercialOffers';
  private apiUrl = environment.bookAPI;

  private _booksInCart: Book[] = [];
  
  constructor(protected http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  // recupere la meilleure promo en fonction du panier
  getPromo(): Observable<Offer> {
    let isbnUrl = '/';
    isbnUrl += this._booksInCart
      .map((x) => (x.isbn + ',').repeat(x.nb))
      .reduce((a, b) => a + b, '');

    const price = this._booksInCart
      .map((x) => x.price * x.nb)
      .reduce((a, b) => a + b, 0);

    return this.http
      .get(this.apiUrl + isbnUrl.slice(0, -1) + this.suffixPromo)
      .pipe(
        map((res) => {
          return this.bestPromoOf(res['offers'], price);
        })
      );
  }

  getBooksInCart(): Book[] {
    return this._booksInCart;
  }

  saveCart(booksInCart: Book[]): void {
    this._booksInCart = booksInCart;
  }
  clearCart(): void {
    this._booksInCart = [];
  }

  // calcule la meilleure promo par rapport au prix
  private bestPromoOf(offers: Offer[], price: number): Offer {
    const prices = offers.map((x) => {
      switch (x.type) {
        case 'percentage':
          return ((100 - x.value) / 100) * price;
        case 'minus':
          return price - x.value;
        case 'slice':
          return price - Math.floor(price / x.sliceValue) * x.value;
        default:
          return 0;
      }
    });

    const ret = offers[prices.indexOf(Math.min.apply(Math, prices))];
    ret.finalPrice = Math.min.apply(Math, prices);
    return ret;
  }
}
