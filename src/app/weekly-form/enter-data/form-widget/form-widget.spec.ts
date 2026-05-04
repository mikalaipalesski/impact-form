import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideMockStore } from "@ngrx/store/testing";

import { FormWidgetComponent } from "./form-widget";
import { EnterDataFormService } from "../enter-data-form-service";
import { INITIAL_WEEKLY_FORM_STATE } from "../../store/reuducer";
import { testTranslateProviders } from "../../../../test/test-translate.providers";

describe("FormWidgetComponent", () => {
  let component: FormWidgetComponent;
  let fixture: ComponentFixture<FormWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormWidgetComponent],
      providers: [
        ...testTranslateProviders(),
        provideMockStore({ initialState: { weeklyForm: INITIAL_WEEKLY_FORM_STATE } }),
      ],
    }).compileComponents();

    const enterDataForm = TestBed.inject(EnterDataFormService).createForm();
    fixture = TestBed.createComponent(FormWidgetComponent);
    fixture.componentRef.setInput("memberForm", enterDataForm.at(0)!);
    fixture.componentRef.setInput("formArray", enterDataForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
