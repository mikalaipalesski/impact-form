import { Provider } from "@angular/core";
import {
  provideTranslateService,
} from "@ngx-translate/core";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";

const LANG_STORAGE_KEY = "impact-form.locale";
const DEFAULT_LANG = "uk";

const httpLoaderProviders = provideTranslateHttpLoader({
  prefix: "/i18n/",
  suffix: ".json",
});

export const LANG_STORAGE = LANG_STORAGE_KEY;
export const DEFAULT_LANGUAGE = DEFAULT_LANG;

/** ngx-translate root setup: Ukrainian default, JSON from `/i18n/{lang}.json` (see `public/i18n/`). */
export function translateAppProviders(): Provider[] {
  return [
    httpLoaderProviders[0],
    ...provideTranslateService({
      fallbackLang: DEFAULT_LANG,
      lang: DEFAULT_LANG,
      loader: httpLoaderProviders[1],
    }),
  ];
}
