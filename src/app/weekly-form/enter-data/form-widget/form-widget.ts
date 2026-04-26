import { Component, inject, input } from "@angular/core";
import { Store } from "@ngrx/store";
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';
import { FormGroup } from "@angular/forms";
import { MemberFormControls } from "../../model/weekly-form-model";
import { GameValues } from "../../model/weekly-stepper-model";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-form-widget",
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./form-widget.html",
  styleUrl: "./form-widget.scss",
})
export class FormWidgetComponent {
  public memberForm = input.required<FormGroup<MemberFormControls>>();
  public gameValues = Object.values(GameValues);

  private store = inject(Store);

  members$ = this.store.select(selectors.selectMembers);
}
