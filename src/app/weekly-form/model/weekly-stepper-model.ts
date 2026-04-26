export interface ImpactMember {
  name: string;
  rank: string;
}

export interface WeeklyFormState {
  currentStep: number;
  members: ImpactMember[];
  error: string | null;
  formValue: WeeklyReportFormValue;
}

export enum GameValues {
  Communication = 'Communication',
  Discipline = 'Discipline',
  Effectiveness = 'Effectiveness',
  Integration = 'Integration',
}

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

export enum WeeklyFormStep {
    Welcome = 0,
    MemberName = 1,
    EnterData = 2,
    Review = 3,
    Submit = 4,
}

export interface WeeklyReportFormValue {
  currentMember: ImpactMember | null;
  impactMemberValues: ImpactMemberValue[];
}

export enum MemberRank {
  OF2 = 'OF-2',
  OF1 = 'OF-1',
  OR9 = 'OR-9',
  OR8 = 'OR-8',
  OR7 = 'OR-7',
  OR6 = 'OR-6',
  OR5 = 'OR-5',
  OR4 = 'OR-4',
  OR3 = 'OR-3',
  OR2 = 'OR-2',
  OR1 = 'OR-1',
}