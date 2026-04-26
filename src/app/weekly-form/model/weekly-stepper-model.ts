export interface ImpactMember {
  name: string;
  rank: string;
}

export enum GameValues {
  Communication = 'Communication',
  Discipline = 'Discipline',
  Effectiveness = 'Effectiveness',
  Integration = 'Integration',
}

export enum WeeklyFormStep {
    Welcome = 'welcome',
    ChooseName = 'choose-name',
    EnterData = 'enter-data',
    Review = 'review',
    Submit = 'submit',
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