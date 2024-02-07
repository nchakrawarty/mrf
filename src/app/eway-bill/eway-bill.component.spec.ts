import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EwayBillComponent } from './eway-bill.component';

describe('EwayBillComponent', () => {
  let component: EwayBillComponent;
  let fixture: ComponentFixture<EwayBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EwayBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EwayBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
