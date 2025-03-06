import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations();

  return <>{t('pageNotFound')}</>;
}
