import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";

import { HomeComponent } from "./home";
import { testTranslateProviders } from "../../test/test-translate.providers";

describe("HomeComponent", () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [...testTranslateProviders(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should have one enabled weekly form control and two disabled", () => {
    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll(
      "button.home-page__btn"
    );
    expect(buttons.length).toBe(3);
    expect(buttons[0].hasAttribute("disabled")).toBe(false);
    expect(buttons[1].hasAttribute("disabled")).toBe(true);
    expect(buttons[2].hasAttribute("disabled")).toBe(true);
  });
});
