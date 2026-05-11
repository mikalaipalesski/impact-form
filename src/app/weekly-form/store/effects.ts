import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersSheetService } from '../services/users-sheet-service';
import { weeklyFormActions } from './actions';
import { Router } from '@angular/router';
import { WeeklyFormStep } from '../model/weekly-stepper-model';
import { SubmitWeeklyService } from '../services/submit-weekly-service';

@Injectable()
export class WeeklyFormEffects {
  private actions$ = inject(Actions);
  private usersSheetService = inject(UsersSheetService);
  private router = inject(Router);
  private submitWeeklyService = inject(SubmitWeeklyService);

  entered$ = createEffect(() =>
    this.actions$.pipe(
      ofType(weeklyFormActions.entered),
      mergeMap(() => [
        weeklyFormActions.navigateToStep({ step: WeeklyFormStep.Welcome }),
        weeklyFormActions.loadMembers()
      ])
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
          case WeeklyFormStep.Welcome:
            this.router.navigate(['/weekly-form', WeeklyFormStep.Welcome]);
            break;
          case WeeklyFormStep.ChooseName:
            this.router.navigate(['/weekly-form', WeeklyFormStep.ChooseName]);
            break;
          case WeeklyFormStep.EnterData:
            this.router.navigate(['/weekly-form', WeeklyFormStep.EnterData]);
            break;
          case WeeklyFormStep.ReviewSubmit:
            this.router.navigate(['/weekly-form', WeeklyFormStep.ReviewSubmit]);
            break;
          case WeeklyFormStep.Submitted:
            this.router.navigate(['/weekly-form', WeeklyFormStep.Submitted]);
            break;
          default:
            this.router.navigate(['/weekly-form', WeeklyFormStep.Welcome]);
        }
      })
    ),
    { dispatch: false },
  );
  navigateToMain$ = createEffect(() =>
    this.actions$.pipe(
      ofType(weeklyFormActions.navigateToMain),
      tap(() => this.router.navigate(['/']))
    ),
    { dispatch: false },
  );

  submitWeekly$ = createEffect(() =>
    this.actions$.pipe(
      ofType(weeklyFormActions.submitWeekly),
      switchMap(({ weeklyFormValue }) =>
        this.submitWeeklyService.submitWeekly(weeklyFormValue).pipe(
          mergeMap(() => [
            weeklyFormActions.submitWeeklySucceeded(),
            weeklyFormActions.navigateToStep({ step: WeeklyFormStep.Submitted }),
          ]),
          catchError((error) => of(weeklyFormActions.submitWeeklyFailed({ error })))
        )
      )
    )
  );
}
