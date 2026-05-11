import { ChangeDetectionStrategy, Component, DestroyRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-submitted-confirmation',
  imports: [TranslatePipe],
  templateUrl: './submitted-confirmation.html',
  styleUrl: './submitted-confirmation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmittedConfirmationComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  /** Fragment matched against `NavigationStart.url` after a browser back/forward; if absent, user is sent `homeUrl`. */
  successUrlPart = input<string>('submitted');

  /** Target when leaving this screen via browser history or the primary action. */
  homeUrl = input<string>('/');

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationStart => e instanceof NavigationStart),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((e) => {
        if (e.navigationTrigger !== 'popstate') {
          return;
        }
        if (!e.url.includes(this.successUrlPart())) {
          void this.router.navigateByUrl(this.homeUrl(), { replaceUrl: true });
        }
      });
  }

  goHome(): void {
    void this.router.navigateByUrl(this.homeUrl());
  }
}
