import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { BookService } from '../service/book.service';
import { Book } from '../model/book';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  //L'ensemble des livres
  books: Book[];
  //Livres à afficher
  booksdisplay: Book[];
  //Livres dans le panier
  booksInCart: Book[] = [];
  //Text de la zone de rechch
  searchTxt: string = '';
  //Observe les modifications du champ de rechch
  typesearch$ = new Subject<string>();


  constructor(private modalServ: NgbModal, private bookServ: BookService) {}

  public addToCart(book: Book) {
    const i = this.booksInCart.findIndex((x) => x == book);
    if (-1 === i) {
      book.nb = 1;
      this.booksInCart.push(book);
    } else {
      this.booksInCart[i].nb++;
    }
  }

  
  public openModal(book: Book) {
    const modal = this.modalServ.open(BookModalComponent, {
      scrollable: true,
      size: 'xl',
    });

    modal.componentInstance.book = book;

    //fermeture de la modal
    modal.result.then(
      (x: Book) => this.addToCart(x),
      (err) => console.info('modal close', err)
    );
  }

  public clearSearch() {
    this.searchTxt = '';
    this.typesearch$.next('');
  }

  ngOnDestroy(): void {
    this.typesearch$.unsubscribe;
  }

  ngOnInit(): void {
    //Filtre lié a la recherche
    this.typesearch$
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(
        (sfilter: string) =>
          (this.booksdisplay =
            sfilter.length === 0
              ? this.books
              : this.books.filter(
                  (v: Book) =>
                    v.title.toLowerCase().indexOf(sfilter.toLowerCase()) > -1
                ))
      );

    //récupération de tous les livres
    this.bookServ
      .getBooks()
      .subscribe((books: Book[]) => (this.books = this.booksdisplay = books));
  }
}
