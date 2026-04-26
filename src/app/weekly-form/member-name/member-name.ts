import { Component, inject, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as selectors from '../store/selectors';
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ImpactMember } from "../model/weekly-stepper-model";
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

  public memberForm = this.fb.group({
    enlistedMember: [null, Validators.required]
  });

  onNext() {
    this.store.dispatch(actions.weeklyFormActions.navigateToStep({ step: 2 }));
    this.store.dispatch(actions.weeklyFormActions.navigateToStep({ step: 2 }));
  }
}
