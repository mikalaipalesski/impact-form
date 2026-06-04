import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadLeadFormWidget } from './squad-lead-form-widget';

describe('SquadLeadFormWidget', () => {
  let component: SquadLeadFormWidget;
  let fixture: ComponentFixture<SquadLeadFormWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquadLeadFormWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(SquadLeadFormWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
