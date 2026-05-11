import { Routes } from '@angular/router';

import { WeeklyFormStep } from './model/weekly-stepper-model';
import { weeklyFormMemberGuard } from './weekly-form-member.guard';

export const WEEKLY_FORM_ROUTES: Routes = [
  {
    path: '',
    canActivate: [weeklyFormMemberGuard],
    loadComponent: () => import('./weekly-form').then((m) => m.WeeklyFormComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'welcome',
      },
      {
        path: 'choose-name',
        pathMatch: 'full',
        redirectTo: WeeklyFormStep.Welcome,
      },
      {
        path: WeeklyFormStep.Welcome,
        loadComponent: () =>
          import('./welcome-step/welcome-step').then((m) => m.WelcomeStepComponent),
      },
      {
        path: WeeklyFormStep.EnterData,
        loadComponent: () => import('./enter-data/enter-data').then((m) => m.EnterDataComponent),
      },
      {
        path: WeeklyFormStep.ReviewSubmit,
        loadComponent: () =>
          import('./review-submit/review-submit').then((m) => m.ReviewSubmitComponent),
      },
      {
        path: WeeklyFormStep.Submitted,
        loadComponent: () =>
          import('../shared/submitted-confirmation/submitted-confirmation').then(
            (m) => m.SubmittedConfirmationComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
