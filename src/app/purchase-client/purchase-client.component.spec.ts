import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseClientComponent } from './purchase-client.component';

describe('PurchaseClientComponent', () => {
  let component: PurchaseClientComponent;
  let fixture: ComponentFixture<PurchaseClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
