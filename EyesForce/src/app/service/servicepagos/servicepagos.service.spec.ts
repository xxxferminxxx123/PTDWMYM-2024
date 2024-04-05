import { TestBed } from '@angular/core/testing';

import { ServicepagosService } from './servicepagos.service';

describe('ServicepagosService', () => {
  let service: ServicepagosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicepagosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
