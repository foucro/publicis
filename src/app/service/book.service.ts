import { Injectable } from '@angular/core';
import { Book } from '../model/book';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(protected http: HttpClient) { }

  getBooks(){
    return  this.http.get<Book[]>(environment.bookAPI);;
  }


}
