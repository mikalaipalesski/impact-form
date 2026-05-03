import { Component, inject, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as selectors from '../store/selectors';
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ImpactMember, WeeklyFormStep } from "../model/weekly-stepper-model";
import * as actions from '../store/actions';

@Component({
  selector: "app-member-name",
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./member-name.html",
  styleUrl: "./member-name.scss",
})
export class MemberNameComponent {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  public enlistedMemberNames$ = this.store.select(selectors.selectEnlistedUsers);
  public enlistedUsersEmpty$ = this.store.select(selectors.enlistedUsersEmpty);
  public currentEnlistedMember = this.store.selectSignal(selectors.selectCurrentEnlistedMember);

  public memberForm = this.fb.group({
    enlistedMember: [this.currentEnlistedMember(), Validators.required]
  });

  onNext() {
    this.store.dispatch(actions.weeklyFormActions.navigateToStep({ step: WeeklyFormStep.EnterData }));
    this.store.dispatch(actions.weeklyFormActions.selectCurrentMember({ member: this.memberForm.value.enlistedMember! }))
  }
}
