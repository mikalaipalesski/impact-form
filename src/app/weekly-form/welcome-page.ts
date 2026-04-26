import { Component, inject, OnInit } from '@angular/core';
import { UsersSheetService } from './services/users-sheet';
import { Store } from '@ngrx/store';
import { weeklyFormActions } from './store/actions';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-weekly-form-welcome-page',
  standalone: true,
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.scss',
  imports: [RouterOutlet],
})
export class WelcomePageComponent implements OnInit {
  public userSheetService = inject(UsersSheetService);
  public store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(weeklyFormActions.loadMembers());

    this.store.select(state => state.weeklyForm).subscribe(weeklyFormState => {
      if (weeklyFormState.error) {
        console.error('Error loading members:', weeklyFormState.error);
      } else {
        console.log('Loaded members:', weeklyFormState.members);
      }
    });
  };

}
