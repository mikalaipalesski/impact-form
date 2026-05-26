import { SquadLeadFeedbackStep, SquadLeadFeedbackStepPath } from '../model/squad-lead-feedback-state-model';

export const SQUAD_LEAD_FEEDBACK_STEPS_MAP = new Map<SquadLeadFeedbackStep, SquadLeadFeedbackStepPath>([
  [SquadLeadFeedbackStep.Instructions, SquadLeadFeedbackStepPath.Instructions],
  [SquadLeadFeedbackStep.Form, SquadLeadFeedbackStepPath.Form],
  [SquadLeadFeedbackStep.VerifySubmit, SquadLeadFeedbackStepPath.VerifySubmit],
  [SquadLeadFeedbackStep.Submitted, SquadLeadFeedbackStepPath.Submitted],
]);
