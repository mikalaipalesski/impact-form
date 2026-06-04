import { createFeature, createReducer, on } from '@ngrx/store';
import { weeklyFormActions } from './actions';
import { WeeklyFormStep } from '../model/weekly-stepper-model';
import { WeeklyFormState } from '../model/weekly-form-state-model';

export const WEEKLY_FORM_FEATURE_KEY = 'weeklyForm';

export const INITIAL_WEEKLY_FORM_STATE: WeeklyFormState = {
  currentStep: WeeklyFormStep.Welcome,
  submitInProgress: false,
  formValue: {
    impactMemberValues: [],
  },
};

const reducer = createReducer(
  INITIAL_WEEKLY_FORM_STATE,
  on(weeklyFormActions.entered, (state) => ({
    ...state,
    currentStep: WeeklyFormStep.Welcome,
    submitInProgress: false,
    error: null,
    formValue: {
      impactMemberValues: [],
    },
  })),
  on(weeklyFormActions.submitWeeklySucceeded, (state) => ({
    ...state,
    submitInProgress: false,
    error: null,
    formValue: {
      impactMemberValues: [],
    },
  })),
  on(weeklyFormActions.navigateToStep, (state, { step }) => ({
    ...state,
    currentStep: step as WeeklyFormStep,
  })),
  on(weeklyFormActions.setImpactMemberValues, (state, { impactMemberValues }) => ({
    ...state,
    formValue: {
      ...state.formValue,
      impactMemberValues,
    },
  })),
  on(weeklyFormActions.submitWeekly, (state) => ({
    ...state,
    submitInProgress: true,
    error: null,
  })),
  on(weeklyFormActions.submitWeeklyFailed, (state, { error }) => ({
    ...state,
    submitInProgress: false,
    error: error instanceof Error ? error.message : 'Submit failed',
  })),
);

export const weeklyFormFeature = createFeature({
  name: WEEKLY_FORM_FEATURE_KEY,
  reducer,
});
