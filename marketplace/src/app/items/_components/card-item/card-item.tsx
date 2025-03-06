import { FunctionComponent, isValidElement, ReactElement } from 'react';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

import { Locale } from '@/i18n/routing';
import layoutStyles from '@/styles/layout.module.sass';
import typographyStyles from '@/styles/typography.module.sass';
import { Price } from '@/types/price-type';
import { WithReactElementType } from '@/types/with-react-element-type';
import { formatCurrency } from '@/utils/format-currency';

import styles from './card-item.module.sass';

type Props = WithReactElementType<{
  title: string;
  price: Price;
  thumbnail: ReactElement;
}> & { free_shipping: boolean; id: string };

export const CardItem: FunctionComponent<Props> = ({
  id,
  title,
  price,
  free_shipping,
  thumbnail,
}) => {
  const locale = useLocale() as Locale;
  const t = useTranslations('itemsPage');

  function getValueIfIdIsEmpty<T>(value: T, defaultValue: T): T {
    return id ? defaultValue : value;
  }

  return (
    <Link
      className={`${styles['card-container']} ${getValueIfIdIsEmpty(layoutStyles['pointer-events-none'], '')}`}
      href={`/items/${id}}`}
      tabIndex={getValueIfIdIsEmpty(-1, undefined)}
    >
      <div className={styles['thumbnail-content']}>{thumbnail}</div>
      <div className={styles['header-content']}>
        <div>
          <h3 className={typographyStyles['title-light']}>
            {isValidElement(price) ? price : formatCurrency(price, locale).formattedValue}
          </h3>
          {free_shipping && <span>{t('freeShipping')}</span>}
        </div>
        <span>{title}</span>
      </div>
    </Link>
  );
};
