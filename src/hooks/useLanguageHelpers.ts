"use client";

import { useTranslations } from "next-intl";

export function useLanguageHelpers() {
  const t = useTranslations();

  const getNestedTranslation = (key: string): string => {
    // next-intl handles nested keys with dot notation automatically
    return t(key);
  };

  const getArrayTranslation = (key: string): string[] => {
    // For arrays, we need to handle them differently
    // Assume arrays are stored as comma-separated or numbered keys
    const result: string[] = [];
    let index = 0;

    try {
      while (true) {
        const value = t(`${key}.${index}`);
        if (!value || value === `${key}.${index}`) break;
        result.push(value);
        index++;
      }
    } catch {
      // If no array format, return empty
    }

    return result;
  };

  return {
    t: getNestedTranslation,
    tArray: getArrayTranslation
  };
}
