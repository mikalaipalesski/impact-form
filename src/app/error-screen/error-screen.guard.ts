import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

/**
 * Prevents access to the error screen if no error object is passed in the router state.
 */
export const errorScreenGuard: CanActivateFn = () => {
  const router = inject(Router);

  // Check if there is an 'error' property in the navigation state
  const navigation = router.getCurrentNavigation();
  const hasError = !!navigation?.extras?.state?.['error'];

  return hasError ? true : router.createUrlTree(['/']);
};
