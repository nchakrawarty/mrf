import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddwasteComponent } from './addwaste.component';

describe('AddwasteComponent', () => {
  let component: AddwasteComponent;
  let fixture: ComponentFixture<AddwasteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddwasteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddwasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
