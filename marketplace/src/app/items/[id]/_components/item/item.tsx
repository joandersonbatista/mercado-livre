import { JSX } from 'react';

import { getLocale, getTranslations } from 'next-intl/server';

import { Picture, Info, Description } from '@/app/items/[id]/_components';
import styles from '@/app/items/[id]/item-page.module.sass';

import { Breadcrumbs } from '@/components';
import { GetItem } from '@/services/marketplace-service/marketplace-service-types';

type Props = {
  data: GetItem;
};

export const Item = async ({ data }: Props): Promise<JSX.Element> => {
  const breadcrumbItems = data.categories.map((category) => ({
    name: category,
  }));

  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'itemPage' });

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <div className={styles['item-content']}>
        <div className={styles['card-content']}>
          <Picture
            picture={data.item.picture}
            alt={`${t('productAltLabel')} ${data.item.title}`}
          />
          <Info
            condition={data.item.condition}
            price={data.item.price}
            title={data.item.title}
          />
        </div>
        <Description description={data.item.description} />
      </div>
    </>
  );
};
