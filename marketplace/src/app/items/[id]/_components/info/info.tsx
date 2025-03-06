import { FunctionComponent, isValidElement } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/components';
import { Locale } from '@/i18n/routing';
import { MarketplaceItemCondition } from '@/services/marketplace-service/marketplace-service-types';
import typographyStyles from '@/styles/typography.module.sass';
import { Price } from '@/types/price-type';
import { WithReactElementType } from '@/types/with-react-element-type';
import { formatCurrency } from '@/utils/format-currency';

import styles from './info.module.sass';

type Props = WithReactElementType<{
  condition: MarketplaceItemCondition;
  price: Price;
  title: string;
}>;

export const Info: FunctionComponent<Props> = ({ condition, price, title }) => {
  const t = useTranslations('itemPage');

  return (
    <div className={styles['info-content']}>
      <span className={typographyStyles['text-neutral-medium']}>
        {isValidElement(condition) ? condition : t(`conditionStatus.${condition}`)}
      </span>
      <h1 className={typographyStyles['title-bold']}>{title}</h1>
      {isValidElement(price) ? price : <PriceContent price={price} />}
    </div>
  );
};

const PriceContent: FunctionComponent<{ price: Price }> = ({ price }) => {
  const t = useTranslations('itemPage');
  const locale = useLocale() as Locale;
  const currency = formatCurrency(price, locale);

  return (
    <>
      <span className={styles['price-tag']}>
        <span className={styles.currency}>{currency.currencyCode}</span>
        <span>{currency.integer}</span>
        <span className={styles.decimals}>{currency.decimal}</span>
      </span>
      <Button>{t('buyNowButtonLabel')}</Button>
    </>
  );
};
