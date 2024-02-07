import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanchayatComponent } from './panchayat.component';

describe('PanchayatComponent', () => {
  let component: PanchayatComponent;
  let fixture: ComponentFixture<PanchayatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanchayatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanchayatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
