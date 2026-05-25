import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadLeadReviewComponent } from './squad-lead-review';

describe('SquadLeadReview', () => {
  let component: SquadLeadReviewComponent;
  let fixture: ComponentFixture<SquadLeadReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquadLeadReviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SquadLeadReviewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
