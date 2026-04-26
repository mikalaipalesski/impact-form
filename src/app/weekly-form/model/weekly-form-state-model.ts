
import { ImpactMember } from './weekly-stepper-model';
import { WeeklyFormValue } from './weekly-form-model';
import { WeeklyFormStep } from './weekly-stepper-model';

export interface WeeklyFormState {
  currentStep: WeeklyFormStep;
  members: ImpactMember[];
  error: string | null;
  formValue: WeeklyFormValue;
}