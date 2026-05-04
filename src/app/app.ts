import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE, LANG_STORAGE } from './core/i18n/translate.providers';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private translate = inject(TranslateService);

  protected readonly currentLang = signal<string>(DEFAULT_LANGUAGE);

  ngOnInit(): void {
    this.translate.addLangs(['uk', 'be']);
    const saved = readStoredLang(LANG_STORAGE);
    const lang = saved ?? DEFAULT_LANGUAGE;
    this.translate.use(lang).subscribe(() => {
      this.currentLang.set(this.translate.getCurrentLang());
    });
  }

  protected setLang(lang: 'uk' | 'be'): void {
    this.translate.use(lang).subscribe(() => {
      writeStoredLang(LANG_STORAGE, lang);
      this.currentLang.set(lang);
    });
  }
}

function readStoredLang(key: string): 'uk' | 'be' | null {
  try {
    if (typeof localStorage === 'undefined' || typeof localStorage.getItem !== 'function') {
      return null;
    }
    const v = localStorage.getItem(key);
    return v === 'be' || v === 'uk' ? v : null;
  } catch {
    return null;
  }
}

function writeStoredLang(key: string, lang: 'uk' | 'be'): void {
  try {
    if (typeof localStorage === 'undefined' || typeof localStorage.setItem !== 'function') {
      return;
    }
    localStorage.setItem(key, lang);
  } catch {
    /* ignore quota / private mode */
  }
}
