import { createFeature, createReducer, on } from '@ngrx/store';
import { weeklyFormActions } from './actions';
import { WeeklyFormStep } from '../model/weekly-stepper-model';
import { WeeklyFormState } from '../model/weekly-form-state-model';

export const WEEKLY_FORM_FEATURE_KEY = 'weeklyForm';

export const initialWeeklyFormState: WeeklyFormState = {
  currentStep: WeeklyFormStep.Welcome,
  members: [],
  error: null,
  formValue: {
    currentMember: null,
    impactMemberValues: []
  }
};

const reducer = createReducer(
  initialWeeklyFormState,
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
);

export const weeklyFormFeature = createFeature({
  name: WEEKLY_FORM_FEATURE_KEY,
  reducer
});
