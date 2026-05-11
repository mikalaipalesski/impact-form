import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { weeklyFormFeature } from './weekly-form/store/reuducer';
import { WeeklyFormEffects } from './weekly-form/store/effects';
import { translateAppProviders } from './core/i18n/translate.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    ...translateAppProviders(),
    provideRouter(routes),
    provideStore({
      [weeklyFormFeature.name]: weeklyFormFeature.reducer,
    }),
    provideEffects(WeeklyFormEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
};
