import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MembersFormComponent } from "./members-form";

describe("MembersForm", () => {
  let component: MembersFormComponent;
  let fixture: ComponentFixture<MembersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembersFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MembersFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
