'use client';

import { ChangeEvent, FunctionComponent } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { Locale } from '@/i18n/routing';
import { setUserLocale } from '@/services/locale/locale';
import layoutStyles from '@/styles/layout.module.sass';

import styles from './language-switcher.module.sass';

type Option = {
  emoji: string;
  value: Locale;
};

const LANGUAGES: Array<Option> = [
  { emoji: '🇧🇷', value: 'br' },
  { emoji: '🇺🇸', value: 'en' },
  { emoji: '🇨🇴', value: 'es' },
];

export const LanguageSwitcher: FunctionComponent = () => {
  const t = useTranslations();
  const locale = useLocale();

  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    const locale = event.target.value as Locale;
    setUserLocale(locale);
  }

  return (
    <label>
      <p className={layoutStyles['sr-only']}>{t('changeLanguage')}</p>
      <select
        className={styles['select-language-content']}
        defaultValue={locale}
        onChange={onChange}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.emoji} {t(lang.value)}
          </option>
        ))}
      </select>
    </label>
  );
};
