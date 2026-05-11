import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { LoadingOverlayComponent } from '../../shared/loading-overlay/loading-overlay';
import * as selectors from '../store/selectors';
import * as actions from '../store/actions';
import { MemberValue } from '../model/weekly-form-model';
import { GameValues, WeeklyFormStep } from '../model/weekly-stepper-model';

export interface ReviewValueBlock {
  game: GameValues;
  picked: boolean;
}

const MEMBER_VALUE_KEYS: { game: GameValues; field: keyof MemberValue }[] = [
  { game: GameValues.Communication, field: 'communication' },
  { game: GameValues.Discipline, field: 'discipline' },
  { game: GameValues.Effectiveness, field: 'effectiveness' },
  { game: GameValues.Integration, field: 'integration' },
];

@Component({
  selector: 'app-review-submit',
  imports: [TranslatePipe, LoadingOverlayComponent],
  templateUrl: './review-submit.html',
  styleUrl: './review-submit.scss',
})
export class ReviewSubmitComponent {
  private store = inject(Store);

  protected weeklyFormValue = this.store.selectSignal(selectors.getWeeklyFormValue);
  protected submitInProgress = this.store.selectSignal(selectors.selectSubmitInProgress);

  protected valueBlocks(member: MemberValue): ReviewValueBlock[] {
    return MEMBER_VALUE_KEYS.reduce<ReviewValueBlock[]>((acc, { game, field }) => {
      const raw = member[field];
      if (raw !== true && raw !== false) {
        return acc;
      }
      acc.push({ game, picked: raw });
      return acc;
    }, []);
  }

  protected onBack(): void {
    this.store.dispatch(
      actions.weeklyFormActions.navigateToStep({ step: WeeklyFormStep.EnterData }),
    );
  }

  protected onSubmit(): void {
    this.store.dispatch(
      actions.weeklyFormActions.submitWeekly({ weeklyFormValue: this.weeklyFormValue() }),
    );
  }
}
