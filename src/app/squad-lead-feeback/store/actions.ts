import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SquadLeadFeedbackStep } from '../model/squad-lead-feedback-state-model';
import { SquadLeadMemberValue } from '../squad-lead-form/squad-lead-form-model';

export const squadLeadFeedbackActions = createActionGroup({
	source: 'Squad Lead Feedback',
	events: {
		Entered: emptyProps(),
		NavigateToStep: props<{ step: SquadLeadFeedbackStep }>(),
		CompleteForm: props<{ formValue: SquadLeadMemberValue[] }>(),
		SubmitForm: emptyProps(),
		SubmitFormSucceeded: emptyProps(),
		SubmitFormFailed: props<{ error: unknown }>(),
	},
});
