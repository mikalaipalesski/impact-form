import { createSelector } from '@ngrx/store';

import { weeklyFormFeature } from './reuducer';
import { ENLISTED_MEMBER_RANKS } from '../constants/enlisted-member-ranks';
import { MemberRank } from '../model/weekly-stepper-model';

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

export const selectCurrentStep = createSelector(
  selectWeeklyFormState,
  (state) => state.currentStep
);

export const selectEnlistedUsers = createSelector(
  selectMembers,
  (members) => members.filter(member => ENLISTED_MEMBER_RANKS.includes(member.rank as MemberRank))
);

export const enlistedUsersEmpty = createSelector(
  selectEnlistedUsers,
  (enlistedUsers) => enlistedUsers.length === 0
);
