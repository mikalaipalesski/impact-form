import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersSheetService } from '../services/users-sheet';
import { weeklyFormActions } from './actions';

@Injectable()
export class WeeklyFormEffects {
  private actions$ = inject(Actions);
  private usersSheetService = inject(UsersSheetService);

  loadMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(weeklyFormActions.loadMembers),
      mergeMap(() =>
        this.usersSheetService.loadUsers().pipe(
          map((members) => weeklyFormActions.loadMembersSuccess({ members })),
          catchError((error) => of(weeklyFormActions.loadMembersFailed({ error })))
        )
      )
    )
  );
}
