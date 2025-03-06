'use client';

import { useTranslations } from 'next-intl';

export default function Error() {
  const t = useTranslations('itemsPage');
  // log error
  return <>{t('errorTitle')}</>;
}
