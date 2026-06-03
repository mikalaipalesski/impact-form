import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ImpactMember } from '../../model/member-model';
import { SquadLeadForm, SquadLeadMemberFormControls, SquadLeadMemberValue } from './squad-lead-form-model';
import { v1 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class SquadLeadFormService {
  public createForm(): SquadLeadForm {
    const form = new FormArray<FormGroup<SquadLeadMemberFormControls>>(
      [],
      { validators: [this.memberDuplicateValidator.bind(this)] },
    );
    form.push(this.createMemberForm());
    return form;
  }

  public addMember(form: SquadLeadForm): void {
    form.push(this.createMemberForm());
  }

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

  private memberDuplicateValidator(control: AbstractControl): ValidationErrors | null {
    const formArray = control as FormArray<FormGroup<SquadLeadMemberFormControls>>;
    const duplications = new Set();
    let hasDuplicates = false;
  
    formArray.controls.forEach((group) => {
      const memberCtrl = group.controls.member;
      const name = memberCtrl.value?.name;

      if (duplications.has(name)) {
        group.setErrors({ duplicateMember: 'errors.duplicateMember' });
        hasDuplicates = true;
      } else {
        duplications.add(name);
        const errors = group.errors;
        if (errors && errors['duplicateMember']) {
          delete errors['duplicateMember'];
        }
      }

    });

    return hasDuplicates ? { hasDuplicateMembers: true } : null;
  }
}
