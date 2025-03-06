import { FunctionComponent } from 'react';

import { type SkeletonProps, Skeleton } from '@/components';

import styles from './breadcrumbs.module.sass';

export const BreadcrumbsSkeleton: FunctionComponent<SkeletonProps> = ({ width, height }) => {
  return (
    <nav className={styles['nav-breadcrumbs']}>
      <Skeleton width={width} height={height} />
    </nav>
  );
};
