import type { MetadataRoute } from "next";

const baseUrl = "https://mmdesign.com.tr";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/projeler", priority: 0.9, changeFrequency: "weekly" as const },
    {
      path: "/projeler/pi-lot-engineering",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/projeler/kaleiici-hotel",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/projeler/kocyigit-trade",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    { path: "/stüdyo", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/hizmetler", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/süreç", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/iletişim", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  const locales = ["tr", "en"] as const;

  const entries = routes.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((locale) => ({
      url: locale === "tr" ? `${baseUrl}${path}` : `${baseUrl}/en${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }))
  );

  return entries;
}
