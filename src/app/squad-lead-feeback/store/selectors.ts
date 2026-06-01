import { createSelector } from '@ngrx/store';
import { squadLeadFeedbackFeature } from './reducer';
import { SquadLeadFeedbackStep } from '../model/squad-lead-feedback-state-model';
import { selectMembersList } from '../../store/selectors';

export const { name: squadLeadFeedbackFeatureKey, selectSquadLeadFeedbackState } =
  squadLeadFeedbackFeature;

export const selectFeedbackStep = createSelector(
  selectSquadLeadFeedbackState,
  (s) => s.step,
);

const WIZARD_STEPS: SquadLeadFeedbackStep[] = [
  SquadLeadFeedbackStep.Instructions,
  SquadLeadFeedbackStep.Form,
  SquadLeadFeedbackStep.VerifySubmit,
];

export const selectIsLastStep = createSelector(selectFeedbackStep, (currentStep) => {
  const idx = WIZARD_STEPS.indexOf(currentStep);
  return {
    current: idx >= 0 ? idx + 1 : WIZARD_STEPS.length,
    total: WIZARD_STEPS.length,
  }});

export const selectFeedbackFormValue = createSelector(
  selectSquadLeadFeedbackState,
  (s) => s.formValue,
);

export const selectFeedbackSubmitInProgress = createSelector(
  selectSquadLeadFeedbackState,
  (s) => s.submitInProgress,
);

export const selectFeedbackError = createSelector(
  selectSquadLeadFeedbackState,
  (s) => s.error,
);
