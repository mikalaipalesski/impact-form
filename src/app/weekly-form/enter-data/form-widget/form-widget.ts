import { Component, computed, inject, input, output, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { MemberValueFormControls } from '../../model/weekly-form-model';
import { GameValues } from '../../model/weekly-stepper-model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorPipe } from '../../../shared/pipes/form-error.pipe';
import { TranslatePipe } from '@ngx-translate/core';
import { selectMembersList } from '../../../store/selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-form-widget',
  imports: [CommonModule, ReactiveFormsModule, FormErrorPipe, TranslatePipe],
  templateUrl: './form-widget.html',
  styleUrl: './form-widget.scss',
})
export class FormWidgetComponent implements OnInit, OnDestroy {
  public memberForm = input.required<FormGroup<MemberValueFormControls>>();
  public formArray = input.required<FormArray<FormGroup<MemberValueFormControls>>>();
  public gameValues = Object.values(GameValues);

  private store = inject(Store);
  private onDestroyRefecence = new Subject<void>();

  protected commentsFieldId = computed(
    () => `form-widget-comments-${this.memberForm().controls.uuid.value}`,
  );

  removedMember = output<string>();
  members$ = this.store.select(selectMembersList);

  ngOnInit() {
    const memberControl = this.memberForm().controls.member;
    const feedbackControl = this.memberForm().controls.messageComment;

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

  protected getFormControl(value: GameValues): FormControl<boolean | null> {
    return this.memberForm().get(value as string) as FormControl<boolean | null>;
  }

  protected getUniqueRadioName(value: GameValues): string {
    const uuid = this.memberForm().controls.uuid.value;
    return `${value}-${uuid}`;
  }

  protected canRemoveMember(): boolean {
    return this.formArray().length > 1;
  }

  protected removeMember(): void {
    if (this.canRemoveMember()) {
      const uuid = this.memberForm().controls.uuid.value;
      this.removedMember.emit(uuid);
    }
  }

  protected toggleRadio(formControl: FormControl<boolean | null>, value: boolean): void {
    if (formControl.value === value) {
      formControl.setValue(null);
    } else {
      formControl.setValue(value);
    }
  }
}
