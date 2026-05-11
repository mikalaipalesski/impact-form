import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { provideMockStore } from "@ngrx/store/testing";

import { HomeComponent } from "./home";
import { MemberRank } from "../weekly-form/model/weekly-stepper-model";
import { INITIAL_WEEKLY_FORM_STATE } from "../weekly-form/store/reuducer";
import { testTranslateProviders } from "../../test/test-translate.providers";

describe("HomeComponent", () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        ...testTranslateProviders(),
        provideRouter([]),
        provideMockStore({ initialState: { weeklyForm: INITIAL_WEEKLY_FORM_STATE } }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe("HomeComponent with selected member", () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        ...testTranslateProviders(),
        provideRouter([]),
        provideMockStore({
          initialState: {
            weeklyForm: {
              ...INITIAL_WEEKLY_FORM_STATE,
              members: [{ name: "Alex", rank: MemberRank.OF1 }],
              formValue: {
                currentMember: { name: "Alex", rank: MemberRank.OF1 },
                impactMemberValues: [],
              },
            },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it("should show weekly form as enabled button and two disabled secondary buttons", () => {
    const el = fixture.nativeElement as HTMLElement;
    const buttons = el.querySelectorAll("button.home-page__btn");
    expect(buttons.length).toBe(3);
    expect(buttons[0].hasAttribute("disabled")).toBe(false);
    expect(buttons[1].hasAttribute("disabled")).toBe(true);
    expect(buttons[2].hasAttribute("disabled")).toBe(true);
  });
});
