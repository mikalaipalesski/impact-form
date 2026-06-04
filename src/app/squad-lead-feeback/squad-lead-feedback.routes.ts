import { Routes } from '@angular/router';
import { SquadLeadFeedbackStepPath } from './model/squad-lead-feedback-state-model';
import { squadLeadFeedbackGuard } from './suqad-laed-feedback.guard';

export const SUQAD_LEAD_FEEDBACK_ROUTES: Routes = [
    {
        path: '',
        canActivate: [squadLeadFeedbackGuard],
        loadComponent: () => import('./squad-lead-feeback').then((m) => m.SquadLeadFeebackComponent),
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'instructions',
            },
            {
                path: SquadLeadFeedbackStepPath.Instructions,
                loadComponent: () => import('./squad-lead-form-instructions/squad-lead-form-instructions').then((m) => m.SquadLeadFormInstructionsComponent),
            },
            {
                path: SquadLeadFeedbackStepPath.Form,
                loadComponent: () => import('./squad-lead-form/squad-lead-form').then((m) => m.SquadLeadFormComponent),
            },
            {
                path: SquadLeadFeedbackStepPath.VerifySubmit,
                loadComponent: () => import('./squad-lead-review/squad-lead-review').then((m) => m.SquadLeadReviewComponent),
            },
            {
                path: SquadLeadFeedbackStepPath.Submitted,
                loadComponent: () => import('../shared/submitted-confirmation/submitted-confirmation').then((m) => m.SubmittedConfirmationComponent),
            },
            {
                path: '**',
                redirectTo: '',
            },
        ],
    },
    {
        path: '**',
        redirectTo: '',
    },
];
