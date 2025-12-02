import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.VIETNAMESE],
    defaultLocale: Locales.ENGLISH
  },
  plugins: [
    syncJSON({
      source: ({ locale }) => `./src/translations/${locale}.json`
    })
  ]
};

export default config;
