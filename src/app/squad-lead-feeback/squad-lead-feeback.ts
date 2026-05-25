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

@Component({
  selector: 'app-squad-lead-feeback',
  standalone: true,
  templateUrl: './squad-lead-feeback.html',
  styleUrl: './squad-lead-feeback.scss',
  imports: [CommonModule, FormsModule, TranslatePipe],
})
export class SquadLeadFeebackComponent {
  private store = inject(Store);

  members: Signal<ImpactMember[]> = this.store.selectSignal(mainSelectors.selectMembersList);

  selectedMember: ImpactMember | null = null;
  message = '';

  constructor() {
    this.store.dispatch(squadLeadFeedbackActions.entered());
  }
}
