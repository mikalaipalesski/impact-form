import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MemberNameComponent } from "./member-name";

describe("MemberNameComponent", () => {
  let component: MemberNameComponent;
  let fixture: ComponentFixture<MemberNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberNameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MemberNameComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
