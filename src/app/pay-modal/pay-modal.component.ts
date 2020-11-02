import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pay-modal',
  templateUrl: './pay-modal.component.html',
  styleUrls: ['./pay-modal.component.scss'],
})
export class PayModalComponent implements OnInit {
  payForm: FormGroup;
  @Input() price: number;

  constructor(public activeModal: NgbActiveModal, private _fb: FormBuilder) {}

  ngOnInit() {
    this.payForm = this._fb.group({
      creditCard: ['', []],
      expirationDate: ['', []],
      cvc: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(4)],
      ],
    });
  }
}
