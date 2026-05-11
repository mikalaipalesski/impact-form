import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { WelcomeStepComponent } from './welcome-step';
import { INITIAL_WEEKLY_FORM_STATE } from '../store/reuducer';
import { testTranslateProviders } from '../../../test/test-translate.providers';

describe('WelcomeStep', () => {
  let component: WelcomeStepComponent;
  let fixture: ComponentFixture<WelcomeStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeStepComponent],
      providers: [
        ...testTranslateProviders(),
        provideMockStore({ initialState: { weeklyForm: INITIAL_WEEKLY_FORM_STATE } }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeStepComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
