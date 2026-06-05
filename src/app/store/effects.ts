import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersSheetService } from '../shared/services/users-sheet-service';
import { mainStoreActions } from '../store/actions';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class MainStoreEffects {
  private actions$ = inject(Actions);
  private usersSheetService = inject(UsersSheetService);
  private router = inject(Router);

  entered$ = createEffect(() =>
    this.actions$.pipe(
      ofType(mainStoreActions.entered),
      mergeMap(() => [mainStoreActions.loadMembers()]),
    ),
  );

  loadMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(mainStoreActions.loadMembers),
      mergeMap(() =>
        this.usersSheetService.loadUsers().pipe(
          map((members) => mainStoreActions.loadMembersSuccess({ members })),
          catchError((error) => of(mainStoreActions.loadMembersFailed({ error }))),
        ),
      ),
    ),
  );

  navigateToMain$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(mainStoreActions.navigateToMain),
        tap(() => this.router.navigate(['/'])),
      ),
    { dispatch: false },
  );

  loadMembersFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(mainStoreActions.loadMembersFailed),
        tap(({ error }) => this.router.navigate(['/error'], { state: { error } })),
      ),
    { dispatch: false },
  );
}
