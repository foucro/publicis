import { Injectable } from '@angular/core';
import { Book } from '../model/book';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private suffixPromo = '/commercialOffers ';
  private apiUrl = environment.bookAPI;

  private _booksInCart: Book[] = [];

  constructor(protected http: HttpClient) {}

  getBooks() {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getPromo(): Observable<Offer> {
    let isbnUrl = '/';
    isbnUrl += this._booksInCart
      .map((x) => x.isbn+",".repeat(x.nb))
      .reduce((a, b) => a + b, '');

    const price = this._booksInCart
      .map((x) => x.price*x.nb)
      .reduce((a, b) => a + b, 0);

    return this.http.get(this.apiUrl + isbnUrl + this.suffixPromo).pipe(
      map((res) => {
        console.info(res);
        return this.bestPromoOf(res['offers'], price);
      })
    );
  }

  getBooksInCart(): Book[] {
    return this._booksInCart;
  }

  saveCart(booksInCart: Book[]) {
    this._booksInCart = booksInCart;
  }

  private bestPromoOf(offers: Offer[], price: number): Offer {
    let prices = offers.map((x) => {
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
    console.info(prices);
    return offers[prices.indexOf(Math.min.apply(Math, prices))];
  }
}

export interface Offer {
  type: string;
  value: number;
  sliceValue?: number;
}
