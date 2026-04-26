import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { WeeklyFormEffects } from './store/effects';
import { weeklyFormFeature } from './store/reuducer';

export const WEEKLY_FORM_ROUTES: Routes = [
  {
    path: '',
    providers: [provideState(weeklyFormFeature), provideEffects(WeeklyFormEffects)],
    children: [
      {
        path: 'welcome-page',
        loadComponent: () =>
          import('./welcome-page.component').then((m) => m.WelcomePageComponent)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'welcome-page'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'welcome-page'
  }
];
