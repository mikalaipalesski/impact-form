import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WelcomeStepComponent } from "./welcome-step";

describe("WelcomeStep", () => {
  let component: WelcomeStepComponent;
  let fixture: ComponentFixture<WelcomeStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeStepComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
