import { createFeature, createReducer, on } from '@ngrx/store';
import { squadLeadFeedbackActions } from './actions';
import { SquadLeadFeedbackState, SquadLeadFeedbackStep } from '../model/squad-lead-feedback-state-model';

export const SQUAD_LEAD_FEEDBACK_FEATURE_KEY = 'squadLeadFeedback';

export const INITIAL_SQUAD_LEAD_FEEDBACK_STATE: SquadLeadFeedbackState = {
	step: SquadLeadFeedbackStep.Instructions,
	formValue: [],
	submitInProgress: false,
	error: null,
};

const reducer = createReducer(
	INITIAL_SQUAD_LEAD_FEEDBACK_STATE,
	on(squadLeadFeedbackActions.entered, () => ({ ...INITIAL_SQUAD_LEAD_FEEDBACK_STATE })),
	on(squadLeadFeedbackActions.setFormChange, (state, { formValue }) => ({
		...state,
		formValue,
		step: SquadLeadFeedbackStep.VerifySubmit,
	})),
	on(squadLeadFeedbackActions.navigateToStep, (state, { step }) => ({
		...state,
		step: step as SquadLeadFeedbackStep,
	})),
	on(squadLeadFeedbackActions.submitForm, (state) => ({ ...state, submitInProgress: true, error: null })),
	on(squadLeadFeedbackActions.submitFormSucceeded, (state) => ({ ...state, submitInProgress: false })),
	on(squadLeadFeedbackActions.submitFormFailed, (state, { error }) => ({
		...state,
		submitInProgress: false,
		error: error instanceof Error ? error.message : 'Submit failed',
	})),
);

export const squadLeadFeedbackFeature = createFeature({
	name: SQUAD_LEAD_FEEDBACK_FEATURE_KEY,
	reducer,
});
