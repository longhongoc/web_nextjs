'use client';
import { ReactNode, useEffect, useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import Cookies from 'js-cookie';
import * as language from '../../../messages';

let setGlobalLocale: ((lng: 'en' | 'ja') => void) | null = null;
let currentLanguage: 'en' | 'ja' = 'en';

export function Providers({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<'en' | 'ja'>('en');

  useEffect(() => {
    const saved = Cookies.get('locale') as 'en' | 'ja' | null;
    if (saved) setLocale(saved);
  }, []);

  const changeLocale = (lng: 'en' | 'ja') => {
    setLocale(lng);
    Cookies.set('locale', lng, { expires: 365 });
  };

  setGlobalLocale = changeLocale;
  currentLanguage = locale;

  return (
    <NextIntlClientProvider locale={locale} messages={language[locale]}>
      {children}
    </NextIntlClientProvider>
  );
}

export function useCurrentLocale() {
  if (!setGlobalLocale) throw new Error('Providers not mounted yet');
  return setGlobalLocale;
}

export function useCurrentLanguage() {
  if (!currentLanguage) throw new Error('Language not mounted yet');
  return currentLanguage;
}
