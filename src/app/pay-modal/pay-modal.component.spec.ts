import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayModalComponent } from './pay-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('PayModalComponent', () => {
  let component: PayModalComponent;
  let fixture: ComponentFixture<PayModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayModalComponent ],
      providers: [NgbActiveModal,FormBuilder],
      imports:[FormsModule,ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
