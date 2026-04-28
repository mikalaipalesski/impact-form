import { Component, inject, input, output } from "@angular/core";
import { Store } from "@ngrx/store";
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';
import { FormControl, FormGroup } from "@angular/forms";
import { MemberValueFormControls } from "../../model/weekly-form-model";
import { GameValues } from "../../model/weekly-stepper-model";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FormErrorPipe } from "./form-error.pipe";
import { NameMap } from "./form-widget-constants";

@Component({
  selector: "app-form-widget",
  imports: [CommonModule, ReactiveFormsModule, FormErrorPipe],
  templateUrl: "./form-widget.html",
  styleUrl: "./form-widget.scss",
})
export class FormWidgetComponent {
  public memberForm = input.required<FormGroup<MemberValueFormControls>>();
  public gameValues = Object.values(GameValues);

  private store = inject(Store);
  
  removedMember = output<string>();
  members$ = this.store.select(selectors.selectMembers);

  protected getValueLabel(value: GameValues): string {
    return NameMap.get(value) ?? value;
  }

  protected getFormControl(value: GameValues): FormControl<boolean | null> {
    return this.memberForm().get(value as string) as FormControl<boolean | null>;
  }

  protected getUniqueRadioName(value: GameValues): string {
    const uuid = this.memberForm().controls.uuid.value;
    return `${value}-${uuid}`;
  }

  protected removeMember(): void {
    const uuid = this.memberForm().controls.uuid.value;
    this.removedMember.emit(uuid);
  }

  protected toggleRadio(formControl: FormControl<boolean | null>, value: boolean): void {
    if (formControl.value === value) {
      formControl.setValue(null);
    } else {
      formControl.setValue(value);
    }
  }
}
