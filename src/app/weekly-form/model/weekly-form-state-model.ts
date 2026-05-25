import { WeeklyFormValue } from './weekly-form-model';
import { WeeklyFormStep } from './weekly-stepper-model';
import { ImpactMember } from '../../model/member-model';

export interface WeeklyFormState {
  currentStep: WeeklyFormStep;
  members: ImpactMember[];
  membersLoading: boolean;
  error: string | null;
  formValue: WeeklyFormValue;
  submitInProgress: boolean;
}
