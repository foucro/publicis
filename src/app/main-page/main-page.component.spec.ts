import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageComponent } from './main-page.component';
import { Book } from '../model/book';
import { of } from 'rxjs';
import { BookService } from '../service/book.service';
import { SmallCartComponent } from '../small-cart/small-cart.component';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';
import { FormsModule } from '@angular/forms';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let bookservice: Partial<BookService>;
  let bookserv;
  const books = [
    {
      isbn: 'njnjn',
      title: 'HP',
      price: 30,
      cover: 'http://henri-potier.xebia.fr/hp1.jpg',
      synopsis: ['Henri ', 'ptier ', 'test '],
    },
    {
      isbn: 'njnppjn',
      title: 'HP2',
      price: 40,
      cover: 'http://henri-potier.xebia.fr/hp2.jpg',
      synopsis: ['Henri ', 'ptier2 ', 'test '],
    },
  ] as Book[];
  beforeEach(() => {
    bookservice = {
      getBooks: () => of(books),
      getBooksInCart: () => [],
    };
    TestBed.configureTestingModule({
      declarations: [MainPageComponent,SmallCartComponent],
      imports: [FontAwesomeTestingModule,FormsModule],
      providers: [{ provide: BookService, useValue: bookservice }],
    }).compileComponents();

    bookserv = TestBed.inject(BookService);
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init books to display', () => {
    expect(component.booksdisplay.length).toBe(2);
  });

  it('should notify', () => {
    bookservice.saveCart = (x) => {};
    component.notifCart$.subscribe((v) => expect(v).toBe(1));
    component.addToCart(books[1]);
  });

  it('should filter on book title', () => {
    component['filterTitle']('hp');

    expect(component.booksdisplay.length).toBe(2);
    component['filterTitle']('p2');

    expect(component.booksdisplay.length).toBe(1);
    component['filterTitle']('');

    expect(component.booksdisplay.length).toBe(2,'if empty show all');
  });

  it('should add a book to cart', () => {
    bookservice.saveCart = (x) => {};

    component.addToCart(books[1]);

    expect(component.booksInCart[0]).toEqual(books[1]);
    expect(component.booksInCart.length).toBe(1);
    expect(component['getCartSize']()).toBe(1);

    component.addToCart(books[1]);

    expect(component.booksInCart[0]).toEqual(books[1]);
    expect(component.booksInCart[0].nb).toEqual(2, '2 books of this type');
    expect(component.booksInCart.length).toBe(1);
    expect(component['getCartSize']()).toBe(2);

    component.addToCart(books[0]);

    expect(component.booksInCart[0]).toEqual(books[1]);
    expect(component.booksInCart.length).toBe(2);
    expect(component['getCartSize']()).toBe(3);
  });
});
