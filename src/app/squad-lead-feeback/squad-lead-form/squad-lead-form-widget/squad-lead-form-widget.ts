import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SquadLeadMemberFormControls } from '../squad-lead-form-model';
import * as selectors from '../../../weekly-form/store/selectors';

@Component({
  selector: 'app-squad-lead-form-widget',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './squad-lead-form-widget.html',
  styleUrl: './squad-lead-form-widget.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquadLeadFormWidget {
  public memberForm = input.required<FormGroup<SquadLeadMemberFormControls>>();
  public canRemoveMember = input.required<boolean>();

  private readonly store = inject(Store);

  protected selectFieldId = computed(
    () => `squad-lead-member-select-${this.memberForm().controls.uuid.value}`,
  );

  protected feedbackFieldId = computed(
    () => `squad-lead-feedback-text-${this.memberForm().controls.uuid.value}`,
  );

  removedMember = output<string>();
  members$ = this.store.select(selectors.selectFeedbackMembers);

  protected removeMember(): void {
    if (this.canRemoveMember()) {
      const uuid = this.memberForm().controls.uuid.value;
      this.removedMember.emit(uuid);
    }
  }
}
