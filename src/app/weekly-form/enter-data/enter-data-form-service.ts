import { Injectable, inject } from "@angular/core";
import { FormArray, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { FormGroup, FormControl } from "@angular/forms";
import { EnterDataForm, MemberValueFormControls, MemberValue, EnterDataFormValue } from "../model/weekly-form-model";
import { GameValues, ImpactMember } from "../model/weekly-stepper-model";
import { v1 as uuid } from "uuid";

@Injectable({
  providedIn: "root",
})
export class EnterDataFormService {

  public createForm(): EnterDataForm {
    const form =  new FormArray<FormGroup<MemberValueFormControls>>([]);

    form.push(this.createMemberForm());

    return form;
  }

  public addMember(form: EnterDataForm) {
    form.push(this.createMemberForm());
  }

  public removeMember(form: EnterDataForm, uuid: string): void {
    const index = form.controls.findIndex(memberForm => memberForm.controls.uuid.value === uuid);
    if (index !== -1) {
      form.removeAt(index);
    }
  }

  public getFormValue(form: EnterDataForm): MemberValue[] {
    const members: MemberValue[] = form.controls.map(memberForm => {
      const controls = memberForm.controls;
      return {
        member: controls.member.value!,
        communication: controls.communication.value!,
        discipline: controls.discipline.value!,
        effectiveness: controls.effectiveness.value!,
        integration: controls.integration.value!,
        messageComment: controls.messageComment.value!,
        uuid: controls.uuid.value!,
      }
    });

    return members;
  }

  public setFormValue(form: EnterDataForm, formValue: MemberValue[]): void {
    form.clear();
    if (!formValue.length) {
      form.push(this.createMemberForm());
      return;
    }

    const memberForms = formValue.map(memberValue => {
      const memberForm = this.createMemberForm();
      memberForm.controls.member.setValue(memberValue.member);
      memberForm.controls.communication.setValue(memberValue.communication);
      memberForm.controls.discipline.setValue(memberValue.discipline);
      memberForm.controls.effectiveness.setValue(memberValue.effectiveness);
      memberForm.controls.integration.setValue(memberValue.integration);
      memberForm.controls.messageComment.setValue(memberValue.messageComment);
      memberForm.controls.uuid.setValue(memberValue.uuid || uuid());
      return memberForm;      
    });

    memberForms.forEach(memberForm => form.push(memberForm));
  }

  private createMemberForm(): FormGroup<MemberValueFormControls> {
    const form = new FormGroup<MemberValueFormControls>({
      member: new FormControl<ImpactMember | null>(null, { nonNullable: true, validators: Validators.required }),
      communication: new FormControl<boolean | null>(null),
      discipline: new FormControl<boolean | null>(null),
      effectiveness: new FormControl<boolean | null>(null),
      integration: new FormControl<boolean | null>(null),
      messageComment: new FormControl<string>('', { nonNullable: true }),
      uuid: new FormControl<string>(uuid(), { nonNullable: true }),
    }, { validators: [this.memberFormValidator] });

    const dependantControls = [
      form.controls.communication,
      form.controls.discipline,
      form.controls.effectiveness,
      form.controls.integration,
      form.controls.messageComment,
    ];

    dependantControls.forEach(control => control.disable({ emitEvent: false }));

    form.controls.member.valueChanges.subscribe(member => {
      if (member) {
        dependantControls.forEach(control => control.enable({ emitEvent: false }));
      } else {
        dependantControls.forEach(control => control.disable({ emitEvent: false }));
      }
    });

    return form;
  }

  private memberFormValidator(control: AbstractControl): ValidationErrors | null {
    const form = control as FormGroup<MemberValueFormControls>;
    const memberSelected = !!form.controls.member.value;

    if (!memberSelected) {
      return null;
    }

    const allValuesEmpty = [
      form.controls.communication,
      form.controls.discipline,
      form.controls.effectiveness,
      form.controls.integration,
    ].every(control => control.value === null);

    const commentEmpty = !form.controls.messageComment.value?.trim();

    if (allValuesEmpty && commentEmpty) {
      return { formIncomplete: "errors.memberFormIncomplete" };
    }

    return null;
  }
}
  