import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { LoadingOverlayComponent } from '../../shared/loading-overlay/loading-overlay';
import * as selectors from '../store/selectors';
import { squadLeadFeedbackActions } from '../store/actions';
import { SquadLeadFeedbackStep } from '../model/squad-lead-feedback-state-model';

@Component({
  selector: 'app-squad-lead-review',
  standalone: true,
  imports: [TranslatePipe, LoadingOverlayComponent],
  templateUrl: './squad-lead-review.html',
  styleUrl: './squad-lead-review.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquadLeadReviewComponent {
  private readonly store = inject(Store);

  protected readonly feedbackValue = this.store.selectSignal(selectors.selectFeedbackFormValue);
  protected readonly submitInProgress = this.store.selectSignal(selectors.selectFeedbackSubmitInProgress);

  protected onBack(): void {
    this.store.dispatch(
      squadLeadFeedbackActions.navigateToStep({ step: SquadLeadFeedbackStep.Form }),
    );
  }

  protected onSubmit(): void {
    this.store.dispatch(
      squadLeadFeedbackActions.submitForm(),
    );
  }
}
