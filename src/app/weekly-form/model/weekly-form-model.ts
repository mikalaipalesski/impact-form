import { ImpactMember } from './weekly-stepper-model';
import { GameValues } from './weekly-stepper-model';

export interface WeeklyFormValue {
  currentMember: ImpactMember | null;

  impactMemberValues: ImpactMemberValue[];
}

export interface ImpactMemberValue {
  member: ImpactMember;

  positiveValues: GameValues[];
  negativeValues: GameValues[];

  messageComment: string;
}