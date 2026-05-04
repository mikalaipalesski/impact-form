import { createSelector } from '@ngrx/store';

import { weeklyFormFeature } from './reuducer';
import { ENLISTED_MEMBER_RANKS } from '../constants/enlisted-member-ranks';
import { MemberRank } from '../model/weekly-stepper-model';
import { WeeklyFormStep } from '../model/weekly-stepper-model';

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

export const getWeeklyFormValue = createSelector(
  selectWeeklyFormState,
  (state) => state.formValue
);

export const selectCurrentEnlistedMember = createSelector(
  selectWeeklyFormState,
  (state) => state.formValue.currentMember
);

export const selectFormValue = createSelector(
  selectWeeklyFormState,
  (state) => state.formValue.impactMemberValues
);

export const selectEnlistedUsers = createSelector(
  selectMembers,
  (members) => members.filter(member => ENLISTED_MEMBER_RANKS.includes(member.rank as MemberRank))
);

export const enlistedUsersEmpty = createSelector(
  selectEnlistedUsers,
  (enlistedUsers) => enlistedUsers.length === 0
);

export const selectStepProgress = createSelector(
  selectCurrentStep,
  (currentStep) => {
    const steps = Object.values(WeeklyFormStep);
    return {
      current: steps.indexOf(currentStep) + 1,
      total: steps.length,
    };
  }
);
