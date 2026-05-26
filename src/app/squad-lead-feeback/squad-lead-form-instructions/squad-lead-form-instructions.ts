import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SquadLeadFeedbackStep } from '../model/squad-lead-feedback-state-model';
import { squadLeadFeedbackActions } from '../store/actions';

@Component({
  selector: 'app-squad-lead-form-instructions',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './squad-lead-form-instructions.html',
  styleUrl: './squad-lead-form-instructions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquadLeadFormInstructionsComponent {
  private readonly store = inject(Store);

  onNext(): void {
    this.store.dispatch(
      squadLeadFeedbackActions.navigateToStep({
        step: SquadLeadFeedbackStep.Form,
      }),
    );
  }
}
