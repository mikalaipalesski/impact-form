import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import * as selectors from "../store/selectors";
import * as actions from "../store/actions";
import { MemberValue } from "../model/weekly-form-model";
import { GameValues } from "../model/weekly-stepper-model";
import { NameMap } from "../enter-data/form-widget/form-widget-constants";

export interface ReviewValueBlock {
  game: GameValues;
  label: string;
  picked: boolean;
}

const MEMBER_VALUE_KEYS: { game: GameValues; field: keyof MemberValue }[] = [
  { game: GameValues.Communication, field: "communication" },
  { game: GameValues.Discipline, field: "discipline" },
  { game: GameValues.Effectiveness, field: "effectiveness" },
  { game: GameValues.Integration, field: "integration" },
];

@Component({
  selector: "app-review-submit",
  imports: [],
  templateUrl: "./review-submit.html",
  styleUrl: "./review-submit.scss",
})
export class ReviewSubmitComponent {
  private store = inject(Store);

  /** Placeholder copy for the review page header; replace with real instructions when ready. */
  protected readonly SAMPLE_MESSAGE =
    "Праглядзіце звесткі ніжэй. Калі ўсё слушна, націсніце «Выслаць», каб адправіць форму.";

  protected impactMemberValues = this.store.selectSignal(selectors.selectFormValue);

  protected valueBlocks(member: MemberValue): ReviewValueBlock[] {
    return MEMBER_VALUE_KEYS.reduce<ReviewValueBlock[]>((acc, { game, field }) => {
      const raw = member[field];
      if (raw !== true && raw !== false) {
        return acc;
      }
      const label = NameMap.get(game) ?? game;
      acc.push({ game, label, picked: raw });
      return acc;
    }, []);
  }

  protected onSubmit(): void {
    this.store.dispatch(actions.weeklyFormActions.entered());
  }
}
