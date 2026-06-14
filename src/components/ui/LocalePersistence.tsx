"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

const STORAGE_KEY = "mm-locale";

export default function LocalePersistence() {
  const locale = useLocale();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // Ignore storage errors
    }
  }, [locale]);

  return null;
}
