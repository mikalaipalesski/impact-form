import { createFeature, createReducer, on } from '@ngrx/store';
import { WeeklyFormUser } from '../services/users-sheet';
import { weeklyFormActions } from './actions';

export const WEEKLY_FORM_FEATURE_KEY = 'weeklyForm';

export interface WeeklyFormState {
  members: WeeklyFormUser[];
  error: string | null;
}

export const initialWeeklyFormState: WeeklyFormState = {
  members: [],
  error: null
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
  }))
);

export const weeklyFormFeature = createFeature({
  name: WEEKLY_FORM_FEATURE_KEY,
  reducer
});
