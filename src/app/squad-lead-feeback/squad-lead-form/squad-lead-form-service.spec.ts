import { TestBed } from '@angular/core/testing';

import { SquadLeadFormService } from './squad-lead-form-service';

describe('SquadLeadFormService', () => {
  let service: SquadLeadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SquadLeadFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
