import { ImpactMember } from '../../model/member-model';

export enum SquadLeadFeedbackStep {
  Instructions = 'Instructions',
  Form = 'Form',
  VerifySubmit = 'VerifySubmit',
}

export interface SquadLeadFeedbackFormValue {
  member: ImpactMember | null;
  message: string;
}

export interface SquadLeadFeedbackState {
  step: SquadLeadFeedbackStep;
  formValue: SquadLeadFeedbackFormValue;
  submitInProgress: boolean;
  error: string | null;
}
