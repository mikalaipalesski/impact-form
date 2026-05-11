import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectStepProgress, selectCurrentStep } from './store/selectors';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import * as actions from './store/actions';
import { WeeklyFormStep } from './model/weekly-stepper-model';

@Component({
  selector: 'app-weekly-form',
  standalone: true,
  templateUrl: './weekly-form.html',
  styleUrl: './weekly-form.scss',
  imports: [RouterOutlet, CommonModule, TranslatePipe],
})
export class WeeklyFormComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  protected stepProgress = this.store.selectSignal(selectStepProgress);
  protected currentStep = this.store.selectSignal(selectCurrentStep);
  protected readonly WeeklyFormStep = WeeklyFormStep;
  protected backButtonHandler!: void;

  ngOnInit(): void {
    const onSubmittedRoute = this.router.url.includes(`/weekly-form/${WeeklyFormStep.Submitted}`);
    if (onSubmittedRoute) {
      this.store.dispatch(
        actions.weeklyFormActions.navigateToStep({ step: WeeklyFormStep.Submitted }),
      );
    } else {
      this.store.dispatch(actions.weeklyFormActions.entered());
    }
  }
}
