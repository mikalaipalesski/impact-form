import { WeeklyFormValue } from './weekly-form-model';
import { WeeklyFormStep } from './weekly-stepper-model';

export interface WeeklyFormState {
  currentStep: WeeklyFormStep;
  formValue: WeeklyFormValue;
  submitInProgress: boolean;
}
