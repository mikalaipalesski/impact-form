import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { EnterDataComponent } from './enter-data';
import { INITIAL_WEEKLY_FORM_STATE } from '../store/reuducer';
import { testTranslateProviders } from '../../../test/test-translate.providers';

describe('EnterData', () => {
  let component: EnterDataComponent;
  let fixture: ComponentFixture<EnterDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterDataComponent],
      providers: [
        ...testTranslateProviders(),
        provideMockStore({ initialState: { weeklyForm: INITIAL_WEEKLY_FORM_STATE } }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EnterDataComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
