import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { MemberNameComponent } from "./member-name";
import { INITIAL_WEEKLY_FORM_STATE } from "../store/reuducer";
import { testTranslateProviders } from "../../../test/test-translate.providers";

describe("MemberNameComponent", () => {
  let component: MemberNameComponent;
  let fixture: ComponentFixture<MemberNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberNameComponent],
      providers: [
        ...testTranslateProviders(),
        provideMockStore({ initialState: { weeklyForm: INITIAL_WEEKLY_FORM_STATE } }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MemberNameComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
