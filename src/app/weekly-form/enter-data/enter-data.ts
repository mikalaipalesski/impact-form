import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as selectors from '../store/selectors';
import * as actions from '../store/actions';
import { EnterDataFormService } from "./enter-data-form-service";
import { EnterDataForm } from "../model/weekly-form-model";

@Component({
  selector: "app-enter-data",
  imports: [CommonModule, ReactiveFormsModule],
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
    // this.store.dispatch(actions.weeklyFormActions.loadMembers());
  }

  protected addMember() {
    this.enterDataFormService.addMember(this.enterDataForm);
  }
}
