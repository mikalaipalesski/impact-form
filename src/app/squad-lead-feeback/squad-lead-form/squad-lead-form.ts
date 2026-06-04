import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SquadLeadFeedbackStep } from '../model/squad-lead-feedback-state-model';
import { squadLeadFeedbackActions } from '../store/actions';
import { SquadLeadFormService } from './squad-lead-form-service';
import { SquadLeadForm, SquadLeadMemberValue } from './squad-lead-form-model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SquadLeadFormWidget } from './squad-lead-form-widget/squad-lead-form-widget';
import * as selectors from '../store/selectors';

@Component({
  selector: 'app-squad-lead-form',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, CommonModule, SquadLeadFormWidget],
  templateUrl: './squad-lead-form.html',
  styleUrl: './squad-lead-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquadLeadFormComponent implements OnInit {
  protected squadLeadFeedbackForm!: SquadLeadForm;

  private readonly store = inject(Store);
  private readonly squadLeadFormService = inject(SquadLeadFormService);

  ngOnInit() {
    this.squadLeadFeedbackForm = this.squadLeadFormService.createForm();
    // Initialization logic for the form component

    const formValue = this.store.selectSignal(selectors.selectFeedbackFormValue);

    if (formValue().length) {
      this.squadLeadFormService.setFormValue(
        this.squadLeadFeedbackForm,
        formValue() as SquadLeadMemberValue[],
      );
    }
  }

  protected onAddWidget(): void {
    this.squadLeadFormService.addMember(this.squadLeadFeedbackForm);
    // This will be expanded in the future to manage a FormArray or similar dynamic logic
    console.log('Add form widget clicked');
  }

  protected onBack(): void {
    this.store.dispatch(
      squadLeadFeedbackActions.navigateToStep({
        step: SquadLeadFeedbackStep.Instructions,
      }),
    );
  }

  protected onRemoveWidget(uuid: string): void {
    this.squadLeadFormService.removeMember(this.squadLeadFeedbackForm, uuid);
  }

  protected onNext(): void {
    if (this.squadLeadFeedbackForm.valid) {
      // Navigate to the verification step
      this.store.dispatch(
        squadLeadFeedbackActions.setFormChange({
          formValue: this.squadLeadFormService.getFormValue(
            this.squadLeadFeedbackForm,
          ) as SquadLeadMemberValue[],
        }),
      );
      this.store.dispatch(
        squadLeadFeedbackActions.navigateToStep({ step: SquadLeadFeedbackStep.VerifySubmit }),
      );
    }
  }
}
