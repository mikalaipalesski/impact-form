import { ImpactMember } from '../../model/member-model';

export enum SquadLeadFeedbackStep {
  Instructions = 'Instructions',
  Form = 'Form',
  VerifySubmit = 'VerifySubmit',
  Submitted = 'Submitted',
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

export enum SquadLeadFeedbackStepPath {
  Instructions = 'instructions',
  Form = 'form',
  VerifySubmit = 'verify_submit',
  Submitted = 'submitted',
}
