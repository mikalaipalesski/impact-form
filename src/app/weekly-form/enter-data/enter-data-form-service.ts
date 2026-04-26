import { Injectable, inject } from "@angular/core";
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import { FormGroup, FormControl } from "@angular/forms";
import { EnterDataForm, MemberFormControls, ImpactMemberValue, EnterDataFormValue } from "../model/weekly-form-model";
import { GameValues, ImpactMember } from "../model/weekly-stepper-model";

@Injectable({
  providedIn: "root",
})
export class EnterDataFormService {

  public createForm(): EnterDataForm {
    const form =  new FormArray<FormGroup<MemberFormControls>>([]);

    form.push(this.createMemberForm());

    return form;
  }

  public addMember(form: EnterDataForm) {
    form.push(this.createMemberForm());
  }

  private createMemberForm(): FormGroup<MemberFormControls> {
    return new FormGroup<MemberFormControls>({
      member: new FormControl<ImpactMember | null>(null, { nonNullable: true, validators: Validators.required }),
      positiveValues: new FormControl<GameValues[]>([], { nonNullable: true, validators: Validators.required }),
      negativeValues: new FormControl<GameValues[]>([], { nonNullable: true, validators: Validators.required }),
      messageComment: new FormControl<string>('', { nonNullable: true }),
    });
  }


}
  