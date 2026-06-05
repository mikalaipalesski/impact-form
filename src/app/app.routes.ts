import { Routes } from '@angular/router';
import { errorScreenGuard } from './error-screen/error-screen.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'weekly-form',
    loadChildren: () =>
      import('./weekly-form/weekly-form.routes').then((m) => m.WEEKLY_FORM_ROUTES),
  },
  {
    path: 'squad-lead-feedback',
    loadChildren: () =>
      import('./squad-lead-feeback/squad-lead-feedback.routes').then(
        (m) => m.SUQAD_LEAD_FEEDBACK_ROUTES,
      ),
  },
  {
    path: 'error',
    loadComponent: () => import('./error-screen/error-screen').then((m) => m.ErrorScreenComponent),
    canActivate: [errorScreenGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
