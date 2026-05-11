import { TestBed } from '@angular/core/testing';

import { EnterDataFormService } from './enter-data-form-service';

describe('EnterDataFormService', () => {
  let service: EnterDataFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnterDataFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
