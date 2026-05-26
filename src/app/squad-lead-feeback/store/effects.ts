import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { squadLeadFeedbackActions } from './actions';
import { SquadLeadFeedbackStep } from '../model/squad-lead-feedback-state-model';
import { SQUAD_LEAD_FEEDBACK_STEPS_MAP } from '../constants/squad-lead-feedback-steps-map';

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

  stepChagnged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(squadLeadFeedbackActions.navigateToStep),
      map(({ step }) => step),
      tap((step: SquadLeadFeedbackStep) => this.changeRoute(step)),
    ),
    {
      dispatch: false,
    },
  );

  private changeRoute(step: SquadLeadFeedbackStep) {
    const path = SQUAD_LEAD_FEEDBACK_STEPS_MAP.get(step);
    if (!path) {
      return;
    }
    void this.router.navigate(['/squad-lead-feedback', path]);
  }
}
