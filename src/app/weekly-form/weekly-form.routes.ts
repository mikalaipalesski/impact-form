import { Routes } from '@angular/router';

export const WEEKLY_FORM_ROUTES: Routes = [
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
];
