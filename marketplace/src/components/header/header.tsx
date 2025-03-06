import { getLocale, getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import { IconButton, LanguageSwitcher } from '@/components';
import layoutStyles from '@/styles/layout.module.sass';

import styles from './header.module.sass';

type SearchParams = { search?: string };

export async function Header() {
  const headerStore = await headers();

  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'navHeader' });

  const searchParams: SearchParams = Object.fromEntries(
    new URLSearchParams(headerStore.get('searchParams') || ''),
  );

  return (
    <header className={styles['nav-header']}>
      <div>
        <Link href="/">
          <Image src="/logo.svg" alt={t('logoMarkAlt')} height={34} width={60} />
        </Link>
        <form action="/items" method="GET" role="search">
          <label className={layoutStyles['sr-only']}>{t('searchFormLabel')}</label>
          <input
            placeholder={t('searchPlaceHolder')}
            type="text"
            name="search"
            autoCorrect="off"
            autoComplete="off"
            maxLength={80}
            data-testid="input-search-items"
            autoCapitalize="off"
            defaultValue={searchParams.search}
            spellCheck={false}
          />
          <IconButton
            icon={
              <Image
                src="/icons/search.svg"
                alt={t('searchIconAlt')}
                aria-label={t('searchIconAriaLabel')}
                width={34}
                height={24}
              />
            }
            data-testid="submit-search-items"
            type="submit"
          />
        </form>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
