import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { BookService } from '../service/book.service';
import { Book } from '../model/book';
import { of } from 'rxjs';
import { Offer } from '../model/Offer';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  let bookservice: Partial<BookService>;
  let bookserv: BookService;
  const books = [
    {
      isbn: 'njnjn',
      title: 'HP',
      price: 30,
      cover: 'http://henri-potier.xebia.fr/hp1.jpg',
      synopsis: ['Henri ', 'ptier ', 'test '],
      nb: 1,
    },
    {
      isbn: 'njnppjn',
      title: 'HP2',
      price: 40,
      cover: 'http://henri-potier.xebia.fr/hp2.jpg',
      synopsis: ['Henri ', 'ptier2 ', 'test '],
      nb: 2,
    },
  ] as Book[];
  const promo = { type: 'percentage', value: 10, finalPrice: 55 } as Offer;

  beforeEach(async(() => {
    bookservice = {
      getBooksInCart: () => books,
      getPromo: () => of(promo),
      clearCart: () => {},
    };
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [{ provide: BookService, useValue: bookservice }],
    }).compileComponents();

    bookserv = TestBed.inject(BookService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate price without offer', () => {
    expect(component.price).toEqual(110);

    component.booksInCart[0].nb = 2;
    component.ngOnInit();
    expect(component.price).toEqual(140);
  });

  it('should clear the cart', () => {
    component.clearCart();
    expect(component.booksInCart.length).toBe(0);
  });

  it('should display an offer message', () => {
    expect(component.promoMessage).toContain('%');

    promo.type = 'minus';
    component.ngOnInit();
    expect(component.promoMessage).toContain('Remise immédiate');

    promo.type = 'slice';
    component.ngOnInit();
    expect(component.promoMessage).toContain('tranche');
  });
});
