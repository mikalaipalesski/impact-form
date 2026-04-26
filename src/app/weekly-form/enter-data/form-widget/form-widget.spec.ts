import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FormWidget } from "./form-widget";

describe("FormWidget", () => {
  let component: FormWidget;
  let fixture: ComponentFixture<FormWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(FormWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
