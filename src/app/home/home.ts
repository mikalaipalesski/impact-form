import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { LoadingOverlayComponent } from '../shared/loading-overlay/loading-overlay';
import { ImpactMember } from '../model/member-model';
import { mainStoreActions } from '../store/actions';
import * as selectors from '../store/selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslatePipe, ReactiveFormsModule, LoadingOverlayComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly membersLoading = this.store.selectSignal(selectors.selectMainMembersLoading);
  protected readonly enlistedMembers = this.store.selectSignal(selectors.selectEnlistedMembers);
  protected readonly currentMember = this.store.selectSignal(selectors.selectCurrentSelectedMember);

  protected readonly memberForm = this.fb.group({
    enlistedMember: [null as ImpactMember | null, Validators.required],
  });

  ngOnInit(): void {
    this.store.dispatch(mainStoreActions.loadMembers());

    this.store
      .select(selectors.selectCurrentSelectedMember)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((member) => {
        if (member) {
          this.memberForm.patchValue({ enlistedMember: member }, { emitEvent: false });
        }
      });

    this.memberForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      if (value.enlistedMember) {
        this.store.dispatch(mainStoreActions.selectCurrentMember({ member: value.enlistedMember }));
      }
    });
  }

  protected goToWeeklyForm(): void {
    void this.router.navigateByUrl('/weekly-form');
  }

  protected goToSlFeedbackForm(): void {
    void this.router.navigateByUrl('/squad-lead-feedback');
  }
}
