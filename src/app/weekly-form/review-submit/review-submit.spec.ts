import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideMockStore } from "@ngrx/store/testing";

import { ReviewSubmitComponent } from "./review-submit";
import { testTranslateProviders } from "../../../test/test-translate.providers";

describe("ReviewSubmit", () => {
  let component: ReviewSubmitComponent;
  let fixture: ComponentFixture<ReviewSubmitComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewSubmitComponent],
      providers: [
        ...testTranslateProviders(),
        provideMockStore({
          initialState: {
            weeklyForm: {
              currentStep: "review_submit",
              members: [],
              membersLoading: false,
              error: null,
              submitInProgress: false,
              formValue: {
                currentMember: null,
                impactMemberValues: [],
              },
            },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewSubmitComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
