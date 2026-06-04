import { createSelector } from '@ngrx/store';

import { weeklyFormFeature } from './reuducer';
import { WeeklyFormStep } from '../model/weekly-stepper-model';

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

export const selectWeeklyFormValue = createSelector(
  selectWeeklyFormState,
  (state) => state.formValue,
);

export const selectFormValue = createSelector(
  selectWeeklyFormState,
  (state) => state.formValue.impactMemberValues,
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
