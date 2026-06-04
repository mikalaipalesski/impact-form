import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadLeadFeebackComponent } from './squad-lead-feeback';

describe('SquadLeadFeebackComponent', () => {
  let component: SquadLeadFeebackComponent;
  let fixture: ComponentFixture<SquadLeadFeebackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquadLeadFeebackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SquadLeadFeebackComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
