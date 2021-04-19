import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyTravelComponent } from './buy-travel.component';

describe('BuyTravelComponent', () => {
  let component: BuyTravelComponent;
  let fixture: ComponentFixture<BuyTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
