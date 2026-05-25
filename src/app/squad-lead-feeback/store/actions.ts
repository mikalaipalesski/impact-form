import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ImpactMember } from '../../model/member-model';
import { SquadLeadFeedbackStep } from '../model/squad-lead-feedback-state-model';

export const squadLeadFeedbackActions = createActionGroup({
	source: 'Squad Lead Feedback',
	events: {
		Entered: emptyProps(),
		NavigateToStep: props<{ step: SquadLeadFeedbackStep }>(),
		CompleteForm: props<{ formValue: { member: ImpactMember | null; message: string } }>(),
		BackToForm: emptyProps(),
		SubmitForm: props<{ formValue: { member: ImpactMember | null; message: string } }>(),
		SubmitFormSucceeded: emptyProps(),
		SubmitFormFailed: props<{ error: unknown }>(),
	},
});
