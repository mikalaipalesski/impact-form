import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  templateUrl: './loading-overlay.html',
  styleUrl: './loading-overlay.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingOverlayComponent {
  visible = input(false);
  variant = input<'spinner' | 'impact'>('spinner');

  protected readonly impactLetters = 'IMPACT'.split('');
}
