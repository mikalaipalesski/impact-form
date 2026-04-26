import { createSelector } from '@ngrx/store';

import { weeklyFormFeature } from './reuducer';

export const {
  name: weeklyFormFeatureKey,
  selectWeeklyFormState
} = weeklyFormFeature;

export const selectWeeklyFormInitialized = createSelector(
  selectWeeklyFormState,
  () => true
);

export const selectMembers = createSelector(
  selectWeeklyFormState,
  (state) => state.members
);

export const selectError = createSelector(
  selectWeeklyFormState,
  (state) => state.error
);
