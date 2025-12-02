import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  const validLocale = locale && ["en", "vi"].includes(locale) ? locale : "en";

  return {
    locale: validLocale,
    messages: (await import(`./src/translations/${validLocale}.json`)).default,
    timeZone: "Asia/Ho_Chi_Minh",
    now: new Date()
  };
});
