import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import * as actions from '../store/actions';
import {Store} from "@ngrx/store";
import { WeeklyFormStep } from "../model/weekly-stepper-model";

@Component({
  selector: "app-welcome-step",
  imports: [],
  templateUrl: "./welcome-step.html",
  styleUrl: "./welcome-step.scss",
})
export class WelcomeStepComponent {
  private router = inject(Router);
  private store = inject(Store);

  start() {
    // this.router.navigate(["/weekly-form/step1"]);
    this.store.dispatch(actions.weeklyFormActions.navigateToStep({ step: WeeklyFormStep.MemberName }));
  }
}
