"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

const STORAGE_KEY = "mm-locale";
const VALID_LOCALES = ["tr", "en"] as const;
type Locale = (typeof VALID_LOCALES)[number];

export default function LocalePersistence() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // On first mount: redirect to stored locale if it differs from current URL locale
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && VALID_LOCALES.includes(stored) && stored !== locale) {
        router.replace(pathname, { locale: stored });
      }
    } catch {
      // localStorage unavailable in some environments
    }
    // Intentionally runs only on mount — pathname/locale exclusions are deliberate
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Whenever the URL locale changes, persist the new preference
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // Ignore storage errors
    }
  }, [locale]);

  return null;
}
