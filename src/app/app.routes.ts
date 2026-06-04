import { Routes } from '@angular/router';

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
    path: '**',
    redirectTo: '',
  },
];
