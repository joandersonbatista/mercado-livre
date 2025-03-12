import { JSX } from 'react';

import { CardItem, NotFoundItems } from '@/app/items/_components';
import styles from '@/app/items/items-page.module.sass';

import { Breadcrumbs } from '@/components';
import { ListItems } from '@/services/marketplace-service/marketplace-service-types';

type Props = {
  data: ListItems;
};

export const Items = async ({ data }: Props): Promise<JSX.Element> => {
  const hasItems = data.items.length > 0;

  if (!hasItems) return <NotFoundItems />;

  const breadcrumbItems = data.categories.map((category) => ({
    name: category,
  }));

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <div className={styles['items-content']}>
        <ol>
          {data.items.map((item) => (
            <li key={item.id}>
              <CardItem
                {...item}
                thumbnail={
                  <img
                    src={item.picture}
                    alt={`item ${item.title}`}
                    height="100%"
                    width="100%"
                  />
                }
              />
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};
