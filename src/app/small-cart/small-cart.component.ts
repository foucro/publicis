import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../model/book';

@Component({
  selector: 'app-small-cart',
  templateUrl: './small-cart.component.html',
  styleUrls: ['./small-cart.component.scss']
})
export class SmallCartComponent implements OnInit {

@Input() booksInCart: Book[];


  constructor() { }

  ngOnInit(): void {
  }

}
