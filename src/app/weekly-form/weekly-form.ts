import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectStepProgress, selectCurrentStep } from './store/selectors';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { WeeklyFormStep } from './model/weekly-stepper-model';

@Component({
  selector: 'app-weekly-form',
  standalone: true,
  templateUrl: './weekly-form.html',
  styleUrl: './weekly-form.scss',
  imports: [RouterOutlet, CommonModule, TranslatePipe],
})
export class WeeklyFormComponent {
  private store = inject(Store);

  protected stepProgress = this.store.selectSignal(selectStepProgress);
  protected currentStep = this.store.selectSignal(selectCurrentStep);
  protected readonly WeeklyFormStep = WeeklyFormStep;
  protected backButtonHandler!: void;
}
