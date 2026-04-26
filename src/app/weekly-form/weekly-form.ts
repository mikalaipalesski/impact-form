import { Component, inject, OnInit } from '@angular/core';
import { UsersSheetService } from './services/users-sheet-service';
import { Store } from '@ngrx/store';
import { weeklyFormActions } from './store/actions';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-weekly-form',
  standalone: true,
  templateUrl: './weekly-form.html',
  styleUrl: './weekly-form.scss',
  imports: [RouterOutlet],
})
export class WeeklyFormComponent implements OnInit {
  public userSheetService = inject(UsersSheetService);
  public store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(weeklyFormActions.entered());
  };

}
