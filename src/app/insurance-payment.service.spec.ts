import { TestBed } from '@angular/core/testing';

import { InsurancePaymentService } from './insurance-payment.service';

describe('InsurancePaymentService', () => {
  let service: InsurancePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsurancePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
