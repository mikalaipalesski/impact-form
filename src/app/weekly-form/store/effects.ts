import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersSheetService } from '../services/users-sheet';
import { weeklyFormActions } from './actions';
import { Router } from '@angular/router';

@Injectable()
export class WeeklyFormEffects {
  private actions$ = inject(Actions);
  private usersSheetService = inject(UsersSheetService);
  private router = inject(Router);

  entered$ = createEffect(() =>
    this.actions$.pipe(
      ofType(weeklyFormActions.entered),
      map(() => weeklyFormActions.loadMembers())
    )
  );

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

  navigateToStep$ = createEffect(() =>
    this.actions$.pipe(
      ofType(weeklyFormActions.navigateToStep),
      map(({ step }) => {
        switch (step) {
          case 0:
            this.router.navigate(['/weekly-form', 'welcome']);
            break;
          case 1:
            this.router.navigate(['/weekly-form', 'choose-member']);
            break;
          default:
            this.router.navigate(['/weekly-form', 'welcome']);
        }
      })
    ),
    { dispatch: false },
  );
}
