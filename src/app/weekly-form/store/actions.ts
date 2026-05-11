import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ImpactMember } from '../model/weekly-stepper-model';
import { WeeklyFormStep } from '../model/weekly-stepper-model';
import { MemberValue, WeeklyFormValue } from '../model/weekly-form-model';

export const weeklyFormActions = createActionGroup({
  source: 'Weekly Form',
  events: {
    Entered: emptyProps(),
    LoadMembers: emptyProps(),
    LoadMembersSuccess: props<{ members: ImpactMember[] }>(),
    LoadMembersFailed: props<{ error: any }>(),
    SelectCurrentMember: props<{ member: ImpactMember }>(),
    NavigateToStep: props<{ step: WeeklyFormStep }>(),
    SetImpactMemberValues: props<{ impactMemberValues: MemberValue[] }>(),
    NavigateToMain: emptyProps(),
    SubmitWeekly: props<{ weeklyFormValue: WeeklyFormValue }>(),
    SubmitWeeklyFailed: props<{ error: unknown }>(),
    SubmitWeeklySucceeded: emptyProps(),
  }
});
