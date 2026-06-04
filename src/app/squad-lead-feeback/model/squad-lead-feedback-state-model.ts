import { ImpactMember } from '../../model/member-model';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { SquadLeadMemberValue } from '../squad-lead-form/squad-lead-form-model';

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
  formValue: SquadLeadMemberValue[];
  submitInProgress: boolean;
  error: string | null;
}

export enum SquadLeadFeedbackStepPath {
  Instructions = 'instructions',
  Form = 'form',
  VerifySubmit = 'verify_submit',
  Submitted = 'submitted',
}
