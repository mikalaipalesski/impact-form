import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { squadLeadFeedbackActions } from './actions';

@Injectable()
export class SquadLeadFeedbackEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);

  submitForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(squadLeadFeedbackActions.submitForm),
      tap(({ formValue }) => console.log('Submitting squad lead feedback:', formValue)),
      tap(() => void this.router.navigate(['/'])),
      map(() => squadLeadFeedbackActions.submitFormSucceeded()),
    ),
  );
}
