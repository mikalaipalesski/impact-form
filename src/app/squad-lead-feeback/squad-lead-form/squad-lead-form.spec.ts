import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadLeadFormComponent } from './squad-lead-form';

describe('SquadLeadFormComponent', () => {
  let component: SquadLeadFormComponent;
  let fixture: ComponentFixture<SquadLeadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquadLeadFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SquadLeadFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
