import { createSelector } from '@ngrx/store';

import { weeklyFormFeature } from './reuducer';
import { ENLISTED_MEMBER_RANKS } from '../constants/enlisted-member-ranks';
import { MemberRank } from '../model/weekly-stepper-model';
import { WeeklyFormStep } from '../model/weekly-stepper-model';

export const { name: weeklyFormFeatureKey, selectWeeklyFormState } = weeklyFormFeature;

export const selectWeeklyFormInitialized = createSelector(selectWeeklyFormState, () => true);

export const selectMembers = createSelector(selectWeeklyFormState, (state) => state.members);

export const selectMembersLoading = createSelector(
  selectWeeklyFormState,
  (state) => state.membersLoading,
);

export const selectError = createSelector(selectWeeklyFormState, (state) => state.error);

export const selectSubmitInProgress = createSelector(
  selectWeeklyFormState,
  (state) => state.submitInProgress,
);

export const selectCurrentStep = createSelector(
  selectWeeklyFormState,
  (state) => state.currentStep,
);

export const getWeeklyFormValue = createSelector(selectWeeklyFormState, (state) => state.formValue);

export const selectCurrentEnlistedMember = createSelector(
  selectWeeklyFormState,
  (state) => state.formValue.currentMember,
);

export const selectFormValue = createSelector(
  selectWeeklyFormState,
  (state) => state.formValue.impactMemberValues,
);

export const selectEnlistedUsers = createSelector(selectMembers, (members) =>
  members.filter((member) => ENLISTED_MEMBER_RANKS.includes(member.rank as MemberRank)),
);

export const selectFeedbackMembers = createSelector(
  selectMembers,
  selectCurrentEnlistedMember,
  (members, currentMember) => {
    if (currentMember) {
      return members.filter((member) => member.name !== currentMember.name);
    }
    return members;
  },
);

export const enlistedUsersEmpty = createSelector(
  selectEnlistedUsers,
  (enlistedUsers) => enlistedUsers.length === 0,
);

const WIZARD_STEPS: WeeklyFormStep[] = [
  WeeklyFormStep.Welcome,
  WeeklyFormStep.EnterData,
  WeeklyFormStep.ReviewSubmit,
];

export const selectStepProgress = createSelector(selectCurrentStep, (currentStep) => {
  const idx = WIZARD_STEPS.indexOf(currentStep);
  return {
    current: idx >= 0 ? idx + 1 : WIZARD_STEPS.length,
    total: WIZARD_STEPS.length,
  };
});
