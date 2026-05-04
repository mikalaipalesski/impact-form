import { Provider } from "@angular/core";
import { provideTranslateLoader, provideTranslateService } from "@ngx-translate/core";

import { BundledTranslateLoader } from "./bundled-translate.loader";

const LANG_STORAGE_KEY = "impact-form.locale";
const DEFAULT_LANG = "uk";

export const LANG_STORAGE = LANG_STORAGE_KEY;
export const DEFAULT_LANGUAGE = DEFAULT_LANG;

/** ngx-translate: Ukrainian default; catalogs imported from `src/assets/i18n/*.json` (bundled). */
export function translateAppProviders(): Provider[] {
  return [
    ...provideTranslateService({
      fallbackLang: DEFAULT_LANG,
      lang: DEFAULT_LANG,
      loader: provideTranslateLoader(BundledTranslateLoader),
    }),
  ];
}
