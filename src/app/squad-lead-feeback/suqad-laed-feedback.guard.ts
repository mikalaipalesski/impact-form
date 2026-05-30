import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentSelectedMember } from '../store/selectors';
import { map } from 'rxjs';

export const squadLeadFeedbackGuard: CanActivateFn = (_route, state) => {
    const router = inject(Router);
    const store = inject(Store);

    return store.select(selectCurrentSelectedMember).pipe(
        map(member => {
            if (!member) {
                return router.parseUrl('/');
            }
            return state.url.includes('/squad-lead-feedback') ? true : router.parseUrl('/');
        })
    );
};