import { createActionGroup, emptyProps } from '@ngrx/store';

export const weeklyFormActions = createActionGroup({
  source: 'Weekly Form',
  events: {
    Entered: emptyProps()
  }
});
