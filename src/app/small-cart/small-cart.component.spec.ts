import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallCartComponent } from './small-cart.component';
import { Book } from '../model/book';
import { AppRoutingModule } from '../app-routing.module';

describe('SmallCartComponent', () => {
  let component: SmallCartComponent;
  let fixture: ComponentFixture<SmallCartComponent>;
  const books = [
    {
      isbn: 'njnjn',
      title: "Henri Potier à l'école des sorciers",
      price: 30,
      cover: 'http://henri-potier.xebia.fr/hp1.jpg',
      synopsis: ['Henri ', 'ptier ', 'test '],
    },
    {
      isbn: 'njnppjn',
      title: 'Henri Potier et la Chambre des secrets',
      price: 40,
      cover: 'http://henri-potier.xebia.fr/hp2.jpg',
      synopsis: ['Henri ', 'ptier2 ', 'test '],
    },
  ] as Book[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SmallCartComponent],
      imports:[AppRoutingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display books in cart', () => {
    let aff = fixture.debugElement.nativeElement.querySelector('div')
      .textContent;

    expect(aff).toContain('vide');

    component.booksInCart = books;
    fixture.detectChanges();

    aff = fixture.debugElement.nativeElement.querySelector('div').textContent;
    expect(aff).toContain('secrets');
    expect(aff).toContain('sorciers');

    component.booksInCart[0].nb = 2;
    fixture.detectChanges();
    aff = fixture.debugElement.nativeElement.querySelector('div').textContent;
    expect(aff).toContain('2 x ');
  });
});
