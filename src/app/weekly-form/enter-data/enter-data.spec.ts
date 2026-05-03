import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EnterDataComponent } from "./enter-data";

describe("EnterData", () => {
  let component: EnterDataComponent;
  let fixture: ComponentFixture<EnterDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnterDataComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
