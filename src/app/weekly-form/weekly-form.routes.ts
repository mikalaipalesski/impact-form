import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { WeeklyFormEffects } from './store/effects';
import { weeklyFormFeature } from './store/reuducer';
import { WeeklyFormStep } from './model/weekly-stepper-model';

export const WEEKLY_FORM_ROUTES: Routes = [
  {
    path: '',
    providers: [provideState(weeklyFormFeature), provideEffects(WeeklyFormEffects)],
    loadComponent: () =>
      import('./weekly-form').then((m) => m.WeeklyFormComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'welcome'
      },
      {
        path: WeeklyFormStep.Welcome,
        loadComponent: () =>
          import('./welcome-step/welcome-step').then((m) => m.WelcomeStepComponent),
      },
      {
        path: WeeklyFormStep.ChooseName,
        loadComponent: () => import('./member-name/member-name').then((m) => m.MemberNameComponent),
      },
      {
        path: WeeklyFormStep.EnterData,
        loadComponent: () => import('./enter-data/enter-data').then((m) => m.EnterDataComponent),
      },
      {
        path: WeeklyFormStep.ReviewSubmit,
        loadComponent: () => import('./review-submit/review-submit').then((m) => m.ReviewSubmitComponent),
      },
      {
        path: WeeklyFormStep.Submitted,
        loadComponent: () =>
          import('../shared/submitted-confirmation/submitted-confirmation').then(
            (m) => m.SubmittedConfirmationComponent
          ),
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
