import { BreadcrumbsSkeleton, Skeleton } from '@/components';

import { CardItem } from './_components';
import styles from './items-page.module.sass';

export default function Loading() {
  return (
    <>
      <BreadcrumbsSkeleton width="100%" height="20px" />
      <div className={styles['items-content']}>
        <ul>
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={index}>
              <CardItem
                id=""
                title={<Skeleton width="70%" height="25px" />}
                price={<Skeleton width="120px" height="21px" />}
                thumbnail={<Skeleton width="100%" height="100%" />}
                free_shipping={false}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
