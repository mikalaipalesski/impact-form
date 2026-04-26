import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { WeeklyFormUser } from '../services/users-sheet';

export const weeklyFormActions = createActionGroup({
  source: 'Weekly Form',
  events: {
    Entered: emptyProps(),
    LoadMembers: emptyProps(),
    LoadMembersSuccess: props<{ members: WeeklyFormUser[] }>(),
    LoadMembersFailed: props<{ error: any }>(),
  }
});
