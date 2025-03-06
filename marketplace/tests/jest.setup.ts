import '@testing-library/jest-dom';
import translateValues from '@/i18n/translations/en.json';

jest.mock('next-intl', () => {
  const actual = jest.requireActual<typeof import('next-intl')>('next-intl');

  const translate = actual.createTranslator({
    locale: 'en',
    messages: translateValues,
  });

  return {
    getLocale: jest.fn(() => 'en'),
    useLocale: jest.fn(() => 'en'),
    useTranslations: jest.fn(() => translate),
  };
});

jest.mock('next-intl/server', () => {
  const actual = jest.requireActual<typeof import('next-intl')>('next-intl');

  const translate = actual.createTranslator({
    locale: 'en',
    messages: translateValues,
  });

  return {
    getLocale: jest.fn(() => 'en'),
    getTranslations: jest.fn(() => translate),
  };
});
