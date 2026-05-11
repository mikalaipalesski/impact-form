import { Injectable } from '@angular/core';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import uk from '../../../assets/i18n/uk.json';
import be from '../../../assets/i18n/be.json';

const CATALOG: Record<string, TranslationObject> = {
  uk: uk as TranslationObject,
  be: be as TranslationObject,
};

/**
 * Loads translations from JSON bundled into the app (no runtime HTTP fetch).
 * Works with any deploy path and avoids missing `/i18n` files on the server.
 */
@Injectable()
export class BundledTranslateLoader extends TranslateLoader {
  getTranslation(lang: string): Observable<TranslationObject> {
    return of(CATALOG[lang] ?? CATALOG['uk']);
  }
}
