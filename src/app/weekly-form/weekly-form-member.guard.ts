import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, take } from "rxjs";

import { WeeklyFormStep } from "./model/weekly-stepper-model";
import { selectWeeklyFormState } from "./store/selectors";

/** Ensures a profile was chosen on the home screen before using the weekly form (members are loaded there only). */
export const weeklyFormMemberGuard: CanActivateFn = (_route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  if (state.url.includes(`/${WeeklyFormStep.Submitted}`)) {
    return true;
  }

  return store.select(selectWeeklyFormState).pipe(
    take(1),
    map((weeklyState) =>
      weeklyState.formValue.currentMember ? true : router.parseUrl("/"),
    ),
  );
};
