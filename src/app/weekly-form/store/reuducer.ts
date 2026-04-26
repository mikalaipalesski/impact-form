import { createFeature, createReducer } from '@ngrx/store';

export const WEEKLY_FORM_FEATURE_KEY = 'weeklyForm';

export interface WeeklyFormState {}

export const initialWeeklyFormState: WeeklyFormState = {};

const reducer = createReducer(initialWeeklyFormState);

export const weeklyFormFeature = createFeature({
  name: WEEKLY_FORM_FEATURE_KEY,
  reducer
});
