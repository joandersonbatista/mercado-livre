import { BreadcrumbsSkeleton, Skeleton } from '@/components';

import { Description, Info, Picture } from './_components';
import styles from './item-page.module.sass';

export default function Loading() {
  return (
    <>
      <BreadcrumbsSkeleton width="100%" height="20px" />
      <div className={styles['item-content']}>
        <div className={styles['card-content']}>
          <Picture picture={<Skeleton width="80%" height="100%" />} />
          <Info
            condition={<Skeleton width="70%" height="16px" />}
            price={<Skeleton width="100%" height="100%" />}
            title={<Skeleton width="100%" height="55px" />}
          />
        </div>
        <Description description={<Skeleton width="100%" height="55px" />} />
      </div>
    </>
  );
}
