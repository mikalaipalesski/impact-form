import { Injectable, Provider } from '@angular/core';
import {
  provideTranslateLoader,
  provideTranslateService,
  TranslateLoader,
  TranslationObject,
} from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class TestTranslateLoader extends TranslateLoader {
  getTranslation(): Observable<TranslationObject> {
    return of({});
  }
}

/** Minimal ngx-translate setup for unit tests (empty catalogs; keys may show as-is). */
export function testTranslateProviders(): Provider[] {
  return [
    ...provideTranslateService({
      lang: 'uk',
      fallbackLang: 'uk',
      loader: provideTranslateLoader(TestTranslateLoader),
    }),
  ];
}
