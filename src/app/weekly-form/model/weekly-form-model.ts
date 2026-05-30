import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ImpactMember } from '../../model/member-model';

export interface WeeklyFormValue {
  impactMemberValues: MemberValue[];
}

export interface EnterDataFormValue {
  members: MemberValue[];
}

export type EnterDataForm = FormArray<FormGroup<MemberValueFormControls>>;

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
