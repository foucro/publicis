import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { BookService } from './book.service';

import { Book } from '../model/book';
import { environment } from 'src/environments/environment';
import { Offer } from '../model/Offer';

describe('BookService', () => {
  let service: BookService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const books = [
    {
      isbn: 'njnjn',
      title: 'HP',
      price: 30,
      cover: 'http://henri-potier.xebia.fr/hp1.jpg',
      synopsis: ['Henri ', 'ptier ', 'test '],
    },
    {
      isbn: 'njn22jn',
      title: 'HP2',
      price: 40,
      cover: 'http://henri-potier.xebia.fr/hp2.jpg',
      synopsis: ['Henri ', 'ptier2 ', 'test '],
    },
  ] as Book[];
  const promos = {
    offers: [
      {
        type: 'percentage',
        value: 4,
      },
      {
        type: 'minus',
        value: 15,
      },
      {
        type: 'slice',
        sliceValue: 100,
        value: 12,
      }
    ] as Offer[]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
    });
    service = TestBed.inject(BookService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should download books', () => {
    service.getBooks().subscribe((value) => {
      expect(value.length).toBe(2);
      expect(value[0].title).toEqual('HP');
      expect(value).toEqual(books);
    });

    const req = httpTestingController.expectOne(environment.bookAPI);

    expect(req.request.method).toEqual('GET');
    req.flush(books);

    httpTestingController.verify();
  });

  it('should return best promo', () => {
    books[0].nb = 1;
    books[1].nb = 2;

    service.saveCart(books);
    service.getPromo().subscribe((val) => {
      expect(val.type).toBe('minus');
    });

    //test construction requete
    const req = httpTestingController.expectOne(
      environment.bookAPI +
        '/' +
        books[0].isbn +
        ',' +
        books[1].isbn +
        ',' +
        books[1].isbn +
        service['suffixPromo']
    );

    expect(req.request.method).toEqual('GET');

    req.flush(promos);

    httpTestingController.verify();
  });
});
