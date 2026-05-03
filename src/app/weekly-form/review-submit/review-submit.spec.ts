import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ReviewSubmitComponent } from "./review-submit";

describe("ReviewSubmit", () => {
  let component: ReviewSubmitComponent;
  let fixture: ComponentFixture<ReviewSubmitComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewSubmitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewSubmitComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
