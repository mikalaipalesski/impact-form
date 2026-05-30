import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ImpactMember } from '../../model/member-model';
import { SquadLeadForm, SquadLeadMemberFormControls, SquadLeadMemberValue } from './squad-lead-form-model';
import { v1 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class SquadLeadFormService {
  /**
   * Creates an initial SquadLeadForm with one empty member feedback entry.
   * @returns The initialized SquadLeadForm.
   */
  public createForm(): SquadLeadForm {
    const form = new FormArray<FormGroup<SquadLeadMemberFormControls>>([]);
    form.push(this.createMemberForm());
    return form;
  }

  /**
   * Adds a new empty member feedback form group to the given SquadLeadForm.
   * @param form The SquadLeadForm to add a member to.
   */
  public addMember(form: SquadLeadForm): void {
    form.push(this.createMemberForm());
  }

  /**
   * Removes a member feedback form group from the given SquadLeadForm based on its UUID.
   * A form cannot be removed if it's the last one remaining.
   * @param form The SquadLeadForm to remove a member from.
   * @param memberUuid The UUID of the member form to remove.
   */
  public removeMember(form: SquadLeadForm, memberUuid: string): void {
    if (form.length === 1) {
      // Prevent removing the last form
      return;
    }

    const index = form.controls.findIndex((memberForm) => memberForm.controls.uuid.value === memberUuid);
    if (index !== -1) {
      form.removeAt(index);
    }
  }

  /**
   * Extracts the current values from the SquadLeadForm into an array of SquadLeadMemberValue.
   * @param form The SquadLeadForm to get values from.
   * @returns An array of SquadLeadMemberValue.
   */
  public getFormValue(form: SquadLeadForm): SquadLeadMemberValue[] {
    return form.controls.map((memberForm) => {
      const controls = memberForm.controls;
      return {
        member: controls.member.value!,
        feedback: controls.feedback.value!,
        uuid: controls.uuid.value!,
      };
    });
  }

  /**
   * Sets the values of the SquadLeadForm based on the provided array of SquadLeadMemberValue.
   * If the provided array is empty, a single default member form is added.
   * @param form The SquadLeadForm to set values for.
   * @param formValue An array of SquadLeadMemberValue to populate the form with.
   */
  public setFormValue(form: SquadLeadForm, formValue: SquadLeadMemberValue[]): void {
    form.clear();
    if (!formValue.length) {
      form.push(this.createMemberForm());
      return;
    }

    formValue.forEach((memberValue) => {
      const memberForm = this.createMemberForm();
      memberForm.controls.member.setValue(memberValue.member);
      memberForm.controls.feedback.setValue(memberValue.feedback);
      memberForm.controls.uuid.setValue(memberValue.uuid);
      form.push(memberForm);
    });
  }

  /**
   * Creates a new FormGroup for a single member's feedback.
   * Includes controls for member selection, feedback text, and a unique identifier.
   * @returns A FormGroup representing a single member's feedback.
   */
  private createMemberForm(): FormGroup<SquadLeadMemberFormControls> {
    const form = new FormGroup<SquadLeadMemberFormControls>({
      member: new FormControl<ImpactMember | null>(null, {
        nonNullable: true,
        validators: Validators.required,
      }),
      feedback: new FormControl<string>('', {
        nonNullable: true,
      }),
      uuid: new FormControl<string>(uuid(), {
        nonNullable: true,
        validators: Validators.required,
      }),
    }, { validators: [this.memberFormValidator] });

    return form;
  }

  private memberFormValidator(control: AbstractControl): ValidationErrors | null {
    const form = control as FormGroup<SquadLeadMemberFormControls>;
    const memberSelected = !!form.controls.member.value;

    if (!memberSelected) {
      return null;
    }

    const feedbackEmpty = !form.controls.feedback.value?.trim();

    if (feedbackEmpty) {
      return { formIncomplete: 'errors.squadLeadFormIncomplete' };
    }

    return null;
  }
}
