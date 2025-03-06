import { FunctionComponent } from 'react';

import { useTranslations } from 'next-intl';

export const ServerError: FunctionComponent = () => {
  const t = useTranslations();

  return <>{t('serverErrorTitle')}</>;
};
