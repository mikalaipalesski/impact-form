import { createFeature, createReducer, on } from '@ngrx/store';
import { weeklyFormActions } from './actions';
import { WeeklyFormStep } from '../model/weekly-stepper-model';
import { WeeklyFormState } from '../model/weekly-form-state-model';

export const WEEKLY_FORM_FEATURE_KEY = 'weeklyForm';

export const INITIAL_WEEKLY_FORM_STATE: WeeklyFormState = {
  currentStep: WeeklyFormStep.Welcome,
  members: [],
  error: null,
  formValue: {
    currentMember: null,
    impactMemberValues: []
  }
};

const reducer = createReducer(
  INITIAL_WEEKLY_FORM_STATE,
  on(weeklyFormActions.entered, () => INITIAL_WEEKLY_FORM_STATE),
  on(weeklyFormActions.loadMembers, (state) => ({
    ...state,
    error: null
  })),
  on(weeklyFormActions.loadMembersSuccess, (state, { members }) => ({
    ...state,
    members,
    error: null
  })),
  on(weeklyFormActions.loadMembersFailed, (state, { error }) => ({
    ...state,
    members: [],
    error: error.message || 'Failed to load members'
  })),
  on(weeklyFormActions.navigateToStep, (state, { step }) => ({
    ...state,
    currentStep: step as WeeklyFormStep
  })),
  on(weeklyFormActions.selectCurrentMember, (state, { member }) => ({
    ...state,
    formValue: {
      ...state.formValue,
      currentMember: member
    }
  })),
  on(weeklyFormActions.setImpactMemberValues, (state, { impactMemberValues }) => ({
    ...state,
    formValue: {
      ...state.formValue,
      impactMemberValues,
    },
  })),
);

export const weeklyFormFeature = createFeature({
  name: WEEKLY_FORM_FEATURE_KEY,
  reducer
});
