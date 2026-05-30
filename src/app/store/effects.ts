import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersSheetService } from '../shared/services/users-sheet-service';
import { mainStoreActions } from '../store/actions';

@Injectable()
export class MainStoreEffects {
  private actions$ = inject(Actions);
  private usersSheetService = inject(UsersSheetService);

  entered$ = createEffect(() => this.actions$.pipe(
    ofType(mainStoreActions.entered),
    mergeMap(() => [mainStoreActions.loadMembers()]),
  ));

  loadMembers$ = createEffect(() => this.actions$.pipe(
    ofType(mainStoreActions.loadMembers),
    mergeMap(() => this.usersSheetService.loadUsers().pipe(
      map(members => mainStoreActions.loadMembersSuccess({ members })),
      catchError(error => of(mainStoreActions.loadMembersFailed({ error }))),
    )),
  ));
}