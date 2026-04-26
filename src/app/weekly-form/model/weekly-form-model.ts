import { ImpactMember } from './weekly-stepper-model';
import { GameValues } from './weekly-stepper-model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface WeeklyFormValue {
  currentMember: ImpactMember | null;

  impactMemberValues: ImpactMemberValue[];
}

export interface EnterDataFormValue {
    members: ImpactMemberValue[];
}

export type EnterDataForm = FormArray<FormGroup<MemberFormControls>>;

export interface MemberFormControls {
  member: FormControl<ImpactMember | null>;
  positiveValues: FormControl<GameValues[]>;
  negativeValues: FormControl<GameValues[]>;
  messageComment: FormControl<string>;
  uuid: FormControl<string>;
}

export interface ImpactMemberValue {
  member: ImpactMember;

  positiveValues: GameValues[];
  negativeValues: GameValues[];

  messageComment: string;
}

