import { Component, OnInit } from '@angular/core';
import { BookService,Offer } from '../service/book.service';
import { Book } from '../model/book';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  promo: Offer;
  booksInCart: Book[]

  constructor(private bookserv: BookService) { }

  ngOnInit(): void {
    this.booksInCart= this.bookserv.getBooksInCart();
    if (this.booksInCart.length)
    this.bookserv.getPromo().subscribe(x=>
      this.promo = x)
  }

}
