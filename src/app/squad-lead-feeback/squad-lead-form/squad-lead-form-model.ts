import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ImpactMember } from '../../model/member-model';

/**
 * Represents the structure of a single member's feedback form controls.
 */
export interface SquadLeadMemberFormControls {
  member: FormControl<ImpactMember | null>;
  feedback: FormControl<string>;
  uuid: FormControl<string>;
}

/**
 * Represents the value of a single member's feedback.
 */
export interface SquadLeadMemberValue {
  member: ImpactMember;
  feedback: string;
  uuid: string;
}

/**
 * Type alias for the main squad lead feedback form, which is a FormArray of member feedback forms.
 */
export type SquadLeadForm = FormArray<FormGroup<SquadLeadMemberFormControls>>;