
import { ImpactMember } from './weekly-stepper-model';
import { WeeklyFormValue } from './weekly-form-model';

export interface WeeklyFormState {
  currentStep: number;
  members: ImpactMember[];
  error: string | null;
  formValue: WeeklyFormValue;
}