import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewTravelComponent } from './renew-travel.component';

describe('RenewTravelComponent', () => {
  let component: RenewTravelComponent;
  let fixture: ComponentFixture<RenewTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
