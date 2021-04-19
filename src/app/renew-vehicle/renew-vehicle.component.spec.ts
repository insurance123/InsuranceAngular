import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewVehicleComponent } from './renew-vehicle.component';

describe('RenewVehicleComponent', () => {
  let component: RenewVehicleComponent;
  let fixture: ComponentFixture<RenewVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
