import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'weekly-form',
    loadChildren: () =>
      import('./weekly-form/weekly-form.routes').then((m) => m.WEEKLY_FORM_ROUTES)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'weekly-form/welcome-page'
  }
];
