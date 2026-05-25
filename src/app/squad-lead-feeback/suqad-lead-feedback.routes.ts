import { SquadLeadFeedbackStepPath } from './model/squad-lead-feedback-state-model';

export const SUQAD_LEAD_FEEDBACK_ROUTES = [
    {
        path: '',
        loadComponent: () => import('./squad-lead-feeback').then((m) => m.SquadLeadFeebackComponent),
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
        path: '**',
        redirectTo: '',
    },
];