import { FunctionComponent } from 'react';

import { useTranslations } from 'next-intl';

export const NotFoundItem: FunctionComponent = () => {
  const t = useTranslations('itemPage');

  return <>{t('notFoundTitle')}</>;
};
