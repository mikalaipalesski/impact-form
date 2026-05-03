import { ImpactMember } from './weekly-stepper-model';
import { GameValues } from './weekly-stepper-model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface WeeklyFormValue {
  currentMember: ImpactMember | null;

  impactMemberValues: MemberValue[];
}

export interface EnterDataFormValue {
    members: MemberValue[];
}

export type EnterDataForm = FormArray<FormGroup<MemberValueFormControls>>;

// export interface MemberFormControls {
//   member: FormControl<ImpactMember | null>;
//   positiveValues: FormControl<GameValues[]>;
//   negativeValues: FormControl<GameValues[]>;
//   messageComment: FormControl<string>;
//   uuid: FormControl<string>;
// }

export interface MemberValueFormControls {
  member: FormControl<ImpactMember | null>;
  communication: FormControl<boolean | null>;
  discipline: FormControl<boolean | null>;
  effectiveness: FormControl<boolean | null>;
  integration: FormControl<boolean | null>;
  messageComment: FormControl<string>;
  uuid: FormControl<string>;
}

export interface MemberValue {
  member: ImpactMember;
  communication: boolean;
  discipline: boolean;
  effectiveness: boolean;
  integration: boolean;
  messageComment: string;
  uuid?: string;
}

// export interface ImpactMemberValue {
//   member: ImpactMember;

//   positiveValues: GameValues[];
//   negativeValues: GameValues[];

//   messageComment: string;
// }

