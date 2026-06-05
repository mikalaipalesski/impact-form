import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { squadLeadFeedbackActions } from './actions';
import { SquadLeadFeedbackStep } from '../model/squad-lead-feedback-state-model';
import { SQUAD_LEAD_FEEDBACK_STEPS_MAP } from '../constants/squad-lead-feedback-steps-map';
import { SubmitSLService } from '../submit-sl-service';
import { Store } from '@ngrx/store';
import { selectFeedbackFormValue } from './selectors';
import { selectCurrentSelectedMember } from '../../store/selectors';

@Injectable()
export class SquadLeadFeedbackEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private submitSLService = inject(SubmitSLService);
  private store = inject(Store);

  entered$ = createEffect(() =>
    this.actions$.pipe(
      ofType(squadLeadFeedbackActions.entered),
      map(() =>
        squadLeadFeedbackActions.navigateToStep({
          step: SquadLeadFeedbackStep.Instructions,
        }),
      ),
    ),
  );

  stepChanged$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(squadLeadFeedbackActions.navigateToStep),
        map(({ step }) => step),
        tap((step: SquadLeadFeedbackStep) => this.changeRoute(step)),
      ),
    {
      dispatch: false,
    },
  );

  submitSLForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(squadLeadFeedbackActions.submitForm), // Assumes action contains formValue or we select it from store
      switchMap(() => {
        const formValue = this.store.selectSignal(selectFeedbackFormValue)();
        const formSender = this.store.selectSignal(selectCurrentSelectedMember)();
        return this.submitSLService.submitSLFeedback(formValue, formSender!).pipe(
          map(() => squadLeadFeedbackActions.submitFormSucceeded()),
          catchError((error) =>
            of(squadLeadFeedbackActions.submitFormFailed({ error })),
          ),
        );
      }),
    ),
  );

  submitSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(squadLeadFeedbackActions.submitFormSucceeded),
      map(() => squadLeadFeedbackActions.navigateToStep({ step: SquadLeadFeedbackStep.Submitted })),
    ),
  );

  submitFormFailedNavigation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(squadLeadFeedbackActions.submitFormFailed),
        tap(({ error }) => this.router.navigate(['/error'], { state: { error } })),
      ),
    { dispatch: false },
  );

  private changeRoute(step: SquadLeadFeedbackStep) {
    const path = SQUAD_LEAD_FEEDBACK_STEPS_MAP.get(step);
    if (!path) {
      return;
    }
    void this.router.navigate(['/squad-lead-feedback', path]);
  }
}
