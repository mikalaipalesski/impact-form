import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as selectors from '../store/selectors';
import * as actions from '../store/actions';
import { EnterDataFormService } from "./enter-data-form-service";
import { EnterDataForm } from "../model/weekly-form-model";
import { FormWidgetComponent } from "./form-widget/form-widget";
import { WeeklyFormStep } from "../model/weekly-stepper-model";

@Component({
  selector: "app-enter-data",
  imports: [CommonModule, ReactiveFormsModule, FormWidgetComponent],
  templateUrl: "./enter-data.html",
  styleUrl: "./enter-data.scss",
})
export class EnterDataComponent implements OnInit {
  private store = inject(Store);
  private enterDataFormService = inject(EnterDataFormService);

  members$ = this.store.select(selectors.selectMembers);
  protected enterDataForm!: EnterDataForm;

  ngOnInit() {
    this.enterDataForm = this.enterDataFormService.createForm();
  }

  protected addMember() {
    this.enterDataFormService.addMember(this.enterDataForm);
  }

  protected removeMember(uuid: string) {
    this.enterDataFormService.removeMember(this.enterDataForm, uuid);
  }

  protected isFormValid(): boolean {
    return this.enterDataForm.valid;
  }

  protected onNext() {
    if (this.isFormValid()) {
      this.store.dispatch(actions.weeklyFormActions.navigateToStep({ step: WeeklyFormStep.Review }));
    }
  }

  protected onBack() {
    this.store.dispatch(actions.weeklyFormActions.navigateToStep({ step: WeeklyFormStep.ChooseName }));
  }
}
