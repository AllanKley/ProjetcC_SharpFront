import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerSalesComponent } from './owner-sales.component';

describe('OwnerSalesComponent', () => {
  let component: OwnerSalesComponent;
  let fixture: ComponentFixture<OwnerSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
