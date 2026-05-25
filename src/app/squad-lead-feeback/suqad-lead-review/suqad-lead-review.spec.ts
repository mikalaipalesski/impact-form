import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuqadLeadReviewComponent } from './suqad-lead-review';

describe('SuqadLeadReview', () => {
  let component: SuqadLeadReviewComponent;
  let fixture: ComponentFixture<SuqadLeadReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuqadLeadReviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SuqadLeadReviewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
