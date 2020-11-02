import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Location } from '@angular/common';

import { BookService } from '../service/book.service';
import { Book } from '../model/book';
import { BookModalComponent } from '../book-modal/book-modal.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  // L'ensemble des livres
  books: Book[];
  // Livres à afficher
  booksdisplay: Book[];
  // Livres dans le panier
  booksInCart: Book[] = [];
  // Text de la zone de rechch
  searchTxt = '';
  // Observe les modifications du champ de rechch
  typesearch$ = new Subject<string>();
  // la notif menu
  notifCart$ = new Subject<number>();

  // Pour gérer lanimation
  navId: number;
  anim = true;
  hiddenCart = true;

  constructor(
    private modalServ: NgbModal,
    private location: Location,
    private bookServ: BookService
  ) {}

  public addToCart(book: Book): void {
    const i = this.booksInCart.findIndex((x) => x.isbn == book.isbn);
    if (-1 === i) {
      book.nb = 1;
      this.booksInCart.push(book);
    } else {
      this.booksInCart[i].nb++;
    }

    this.bookServ.saveCart(this.booksInCart);
    this.notifCart$.next(this.getCartSize());
  }

  // Nombre total de livres dans le panier
  private getCartSize(): number {
    if (!this.booksInCart?.length) return 0;
    return this.booksInCart.map((x) => x.nb).reduce((a, b) => a + b);
  }

  // modal avec description longue
  public openModal(book: Book): void {
    const modal = this.modalServ.open(BookModalComponent, {
      scrollable: true,
      size: 'xl',
    });

    modal.componentInstance.book = book;

    // fermeture de la modal
    modal.result.then(
      (x: Book) => this.addToCart(x),
      (err) => {}
    );
  }

  public clearSearch(): void {
    this.searchTxt = '';
    this.typesearch$.next('');
  }

  ngOnDestroy(): void {
    this.typesearch$.unsubscribe;
  }

  ngOnInit(): void {
    // observable lié a la recherche
    this.typesearch$
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(this.filterTitle);

    this.navId = this.location.getState()
      ? this.location.getState()['navigationId']
      : 0;

    // récupération de tous les livres
    this.bookServ
      .getBooks()
      .subscribe((books: Book[]) => (this.books = this.booksdisplay = books));

    this.booksInCart = this.bookServ.getBooksInCart();
  }

  // methode de filtre sur les titres
  private filterTitle(sfilter: string): void {
    this.anim = false;
    this.booksdisplay =
      sfilter.length === 0
        ? this.books
        : this.books.filter(
            (v: Book) =>
              v.title.toLowerCase().indexOf(sfilter.toLowerCase()) > -1
          );
  }
}
