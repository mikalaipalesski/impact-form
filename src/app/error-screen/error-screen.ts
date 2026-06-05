import { Component, Input, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-screen',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './error-screen.html',
  styleUrl: './error-screen.scss',
})
export class ErrorScreenComponent {
  // Bound automatically from router state via withComponentInputBinding()
  @Input() set error(value: any) {
    this.errorMessage.set(value);
  }

  protected readonly errorMessage = signal<any>(null);

  protected copyError(): void {
    const error = this.errorMessage();
    if (error) {
      const text = typeof error === 'string' ? error : JSON.stringify(error, null, 2);
      navigator.clipboard.writeText(text).catch((err) => {
        console.error('Could not copy text: ', err);
      });
    }
  }
}
