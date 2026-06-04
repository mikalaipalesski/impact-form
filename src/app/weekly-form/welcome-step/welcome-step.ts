import { Component, inject, OnInit } from '@angular/core';
import { weeklyFormActions } from '../store/actions';
import { Store } from '@ngrx/store';
import { WeeklyFormStep } from '../model/weekly-stepper-model';
import { TranslatePipe } from '@ngx-translate/core';
import { mainStoreActions } from '../../store/actions';

@Component({
  selector: 'app-welcome-step',
  imports: [TranslatePipe],
  templateUrl: './welcome-step.html',
  styleUrl: './welcome-step.scss',
})
export class WelcomeStepComponent implements OnInit {
  private store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(weeklyFormActions.entered());
  }

  start() {
    this.store.dispatch(weeklyFormActions.navigateToStep({ step: WeeklyFormStep.EnterData }));
  }

  onBack(): void {
    this.store.dispatch(mainStoreActions.navigateToMain());
  }
}
