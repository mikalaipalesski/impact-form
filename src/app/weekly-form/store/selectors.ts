import { createSelector } from '@ngrx/store';

import { weeklyFormFeature } from './reuducer';
import { ENLISTED_MEMBER_RANKS } from '../../constants/enlisted-member-ranks';
import { MemberRank } from '../model/weekly-stepper-model';
import { WeeklyFormStep } from '../model/weekly-stepper-model';
import { selectCurrentSelectedMember, selectMembersList } from '../../store/selectors';

export const { name: weeklyFormFeatureKey, selectWeeklyFormState } = weeklyFormFeature;

export const selectWeeklyFormInitialized = createSelector(selectWeeklyFormState, () => true);

export const selectSubmitInProgress = createSelector(
  selectWeeklyFormState,
  (state) => state.submitInProgress,
);

export const selectCurrentStep = createSelector(
  selectWeeklyFormState,
  (state) => state.currentStep,
);

export const selectWeeklyFormValue = createSelector(selectWeeklyFormState, (state) => state.formValue);

export const selectFormValue = createSelector(
  selectWeeklyFormState,
  (state) => state.formValue.impactMemberValues,
);

export const selectFeedbackMembersList = createSelector(
  selectMembersList,
  selectWeeklyFormValue,
  (members, formValue) => {
    const selectedMembers = formValue.impactMemberValues.map((v) => v.member.name);
    return members.filter((m) => !selectedMembers.includes(m.name));
  },
)


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
