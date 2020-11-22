import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidParcelComponent } from './paid-parcel.component';

describe('PaidParcelComponent', () => {
  let component: PaidParcelComponent;
  let fixture: ComponentFixture<PaidParcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidParcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
