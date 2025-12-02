import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yourportfolio.vercel.app"; // Thay bằng domain thật khi deploy
  const locales = ["en", "vi"];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Thêm entry cho root của mỗi locale
  locales.forEach((locale) => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    });
  });

  return sitemapEntries;
}
