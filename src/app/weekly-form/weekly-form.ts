import { Component, inject, OnInit } from '@angular/core';
import { UsersSheetService } from './services/users-sheet-service';
import { Store } from '@ngrx/store';
import { RouterOutlet } from '@angular/router';
import { selectStepProgress } from './store/selectors';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import * as actions from './store/actions';

@Component({
  selector: 'app-weekly-form',
  standalone: true,
  templateUrl: './weekly-form.html',
  styleUrl: './weekly-form.scss',
  imports: [RouterOutlet, CommonModule, TranslatePipe],
})
export class WeeklyFormComponent implements OnInit {
  public userSheetService = inject(UsersSheetService);
  public store = inject(Store);

  protected stepProgress = this.store.selectSignal(selectStepProgress);
  protected backButtonHandler!: void;

  ngOnInit(): void {
    this.store.dispatch(actions.weeklyFormActions.entered());
  }
}
