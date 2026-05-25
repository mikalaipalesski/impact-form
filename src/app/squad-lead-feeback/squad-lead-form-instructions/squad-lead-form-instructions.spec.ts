import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadLeadFormInstructionsComponent } from './squad-lead-form-instructions';

describe('SquadLeadFormInstructions', () => {
  let component: SquadLeadFormInstructionsComponent;
  let fixture: ComponentFixture<SquadLeadFormInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquadLeadFormInstructionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SquadLeadFormInstructionsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
