import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  computed,
  OnDestroy,
  inject,
  input,
  output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SquadLeadMemberFormControls } from '../squad-lead-form-model';
import { FormErrorPipe } from '../../../shared/pipes/form-error.pipe';
import { selectMembersList } from '../../../store/selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-squad-lead-form-widget',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, FormErrorPipe],
  templateUrl: './squad-lead-form-widget.html',
  styleUrl: './squad-lead-form-widget.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquadLeadFormWidget implements OnInit, OnDestroy {
  public memberForm = input.required<FormGroup<SquadLeadMemberFormControls>>();
  public canRemoveMember = input.required<boolean>();
  private readonly onDestroyRefecence = new Subject<void>();

  private readonly store = inject(Store);
  private readonly cdr = inject(ChangeDetectorRef);

  protected selectFieldId = computed(
    () => `squad-lead-member-select-${this.memberForm().controls.uuid.value}`,
  );

  protected feedbackFieldId = computed(
    () => `squad-lead-feedback-text-${this.memberForm().controls.uuid.value}`,
  );

  removedMember = output<string>();
  members = this.store.selectSignal(selectMembersList);

  ngOnInit() {
    const memberControl = this.memberForm().controls.member;
    const feedbackControl = this.memberForm().controls.feedback;

    if (!memberControl.value) {
      feedbackControl.disable();
    }

    memberControl.valueChanges.pipe(takeUntil(this.onDestroyRefecence)).subscribe((member) => {
      if (member) {
        feedbackControl.enable();
      } else {
        feedbackControl.disable();
      }
    });
  }

  ngOnDestroy() {
    this.onDestroyRefecence.next();
    this.onDestroyRefecence.complete();
  }

  protected removeMember(): void {
    if (this.canRemoveMember()) {
      const uuid = this.memberForm().controls.uuid.value;
      this.removedMember.emit(uuid);
    }
  }
}
