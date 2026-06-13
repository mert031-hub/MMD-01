import type { MetadataRoute } from "next";

const BASE_URL = "https://mmdesign.com.tr";

type SitemapRoute = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const routes: SitemapRoute[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/projeler", priority: 0.9, changeFrequency: "weekly" },
  { path: "/projeler/pi-lot-engineering", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projeler/kaleiici-hotel", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projeler/kocyigit-trade", priority: 0.8, changeFrequency: "monthly" },
  { path: "/studyo", priority: 0.7, changeFrequency: "monthly" },
  { path: "/hizmetler", priority: 0.7, changeFrequency: "monthly" },
  { path: "/surec", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.flatMap(({ path, priority, changeFrequency }) => [
    {
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    },
    {
      url: path === "/" ? `${BASE_URL}/en` : `${BASE_URL}/en${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    },
  ]);
}
