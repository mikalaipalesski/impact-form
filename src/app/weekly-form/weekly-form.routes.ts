import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { WeeklyFormEffects } from './store/effects';
import { weeklyFormFeature } from './store/reuducer';

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
        path: 'welcome',
        loadComponent: () =>
          import('./welcome-step/welcome-step').then((m) => m.WelcomeStepComponent),
      },
      {
        path: 'choose-member',
        loadComponent: () => import('./member-name/member-name').then((m) => m.MemberNameComponent),
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
