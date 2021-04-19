import { TestBed } from '@angular/core/testing';

import { VehicleInsuranceService } from './vehicle-insurance.service';

describe('VehicleInsuranceService', () => {
  let service: VehicleInsuranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleInsuranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
