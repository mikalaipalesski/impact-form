import { Component, inject } from "@angular/core";
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
  private store = inject(Store);

  start() {
    this.store.dispatch(actions.weeklyFormActions.navigateToStep({ step: WeeklyFormStep.ChooseName }));
  }
}
