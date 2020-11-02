import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service';
import { Offer } from '../model/Offer';
import { Book } from '../model/book';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PayModalComponent } from '../pay-modal/pay-modal.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  // Promo a appliquer
  promo: Offer;
  // livres dans le panier
  booksInCart: Book[];
  // pripromo total avant promo
  price: number;
  // message epromopliquant la promo
  promoMessage: string = '';
  // affichage
  showVid = false;
  easter = false;
  notifCart$ = new Subject<number>();

  constructor(private bookserv: BookService, private modalServ: NgbModal) {}

  ngOnInit(): void {
    this.booksInCart = this.bookserv.getBooksInCart();
    if (this.booksInCart?.length)
      this.bookserv.getPromo().subscribe((promo) => {
        this.promo = promo;
        this._setPromoMessage(promo);
      });

    this.price = this.booksInCart
      .map((b) => b.price * b.nb)
      .reduce((a, b) => a + b, 0);
  }

  /**
   * Définition du message de promotion
   *
   * @param promo Meilleure offre selectionnée
   */
  private _setPromoMessage(promo: Offer): void {
    let val = '';
    switch (promo.type) {
      case 'percentage':
        val = `Réduction de ${promo.value}%`;
        break;
      case 'minus':
        val = `Remise immédiate de €${promo.value} `;
        break;
      case 'slice':
        val = `Remise de €${promo.value}  par tranche de ${promo.sliceValue}`;
        break;
      default:
        console.error('wrong offer type :', promo.type);
        return;
    }
    this.promoMessage = val;
  }

  public clearCart(): void {
    this.booksInCart = [];
    this.bookserv.clearCart();
    this.notifCart$.next(0);
  }

  public openPayModal(): void {
    const modal = this.modalServ.open(PayModalComponent, {
      scrollable: false,
      size: 'lg',
    });

    modal.componentInstance.price = this.promo.finalPrice;
  }
}
