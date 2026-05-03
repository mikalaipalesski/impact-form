import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FormWidgetComponent } from "./form-widget";

describe("FormWidgetComponent", () => {
  let component: FormWidgetComponent;
  let fixture: ComponentFixture<FormWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormWidgetComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
