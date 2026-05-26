import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadLeadFormSubmittedComponent } from './squad-lead-form-submitted';

describe('SquadLeadFormSubmittedComponent', () => {
  let component: SquadLeadFormSubmittedComponent;
  let fixture: ComponentFixture<SquadLeadFormSubmittedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquadLeadFormSubmittedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SquadLeadFormSubmittedComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
