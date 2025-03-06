import { FunctionComponent } from 'react';

import { useTranslations } from 'next-intl';

export const NotFoundItems: FunctionComponent = () => {
  const t = useTranslations('itemsPage');

  return <>{t('notFoundTitle')}</>;
};
