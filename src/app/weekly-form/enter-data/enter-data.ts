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
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-enter-data",
  imports: [CommonModule, ReactiveFormsModule, FormWidgetComponent, TranslatePipe],
  templateUrl: "./enter-data.html",
  styleUrl: "./enter-data.scss",
})
export class EnterDataComponent implements OnInit {
  private store = inject(Store);
  private enterDataFormService = inject(EnterDataFormService);

  members$ = this.store.select(selectors.selectMembers);
  currentMembersForm = this.store.selectSignal(selectors.selectFormValue);
  protected enterDataForm!: EnterDataForm;

  ngOnInit() {
    this.enterDataForm = this.enterDataFormService.createForm();

    const currentMembersFormValue = this.currentMembersForm();
    if (currentMembersFormValue.length) {
      this.enterDataFormService.setFormValue(this.enterDataForm, currentMembersFormValue);
    }
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
      const impactMemberValues = this.enterDataFormService.getFormValue(this.enterDataForm);
      this.store.dispatch(actions.weeklyFormActions.setImpactMemberValues({ impactMemberValues }));
      this.store.dispatch(actions.weeklyFormActions.navigateToStep({ step: WeeklyFormStep.ReviewSubmit }));
    }
  }

  protected onBack() {
    this.store.dispatch(actions.weeklyFormActions.navigateToStep({ step: WeeklyFormStep.Welcome }));
  }
}
