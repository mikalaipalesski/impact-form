import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ImpactMember } from '../model/member-model';
import { SquadLeadFeedbackStep } from './model/squad-lead-feedback-state-model';
import { squadLeadFeedbackActions } from './store/actions';
import * as selectors from './store/selectors';
import * as mainSelectors from '../store/selectors';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-squad-lead-feeback',
  standalone: true,
  templateUrl: './squad-lead-feeback.html',
  styleUrl: './squad-lead-feeback.scss',
  imports: [CommonModule, FormsModule, TranslatePipe, RouterModule],
})
export class SquadLeadFeebackComponent {
  private store = inject(Store);

  protected stepProgress = this.store.selectSignal(selectors.selectIsLastStep);
  protected currentStep: Signal<SquadLeadFeedbackStep> = this.store.selectSignal(selectors.selectFeedbackStep);
  protected members: Signal<ImpactMember[]> = this.store.selectSignal(mainSelectors.selectMembersList);
  protected readonly SquadLeadFeedbackStep = SquadLeadFeedbackStep;
}
