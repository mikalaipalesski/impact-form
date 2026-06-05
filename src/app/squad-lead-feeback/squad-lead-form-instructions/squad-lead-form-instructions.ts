import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SquadLeadFeedbackStep } from '../model/squad-lead-feedback-state-model';
import { squadLeadFeedbackActions } from '../store/actions';
import { mainStoreActions } from '../../store/actions';

@Component({
  selector: 'app-squad-lead-form-instructions',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './squad-lead-form-instructions.html',
  styleUrl: './squad-lead-form-instructions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquadLeadFormInstructionsComponent implements OnInit {
  private readonly store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(squadLeadFeedbackActions.entered());
  }

  onNext(): void {
    this.store.dispatch(
      squadLeadFeedbackActions.navigateToStep({
        step: SquadLeadFeedbackStep.Form,
      }),
    );
  }

  onBack(): void {
    this.store.dispatch(mainStoreActions.navigateToMain());
  }
}
