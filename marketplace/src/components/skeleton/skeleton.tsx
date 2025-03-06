import { FunctionComponent } from 'react';

import styles from './skeleton.module.sass';

export type SkeletonProps = {
  width?: string;
  height?: string;
};

export const Skeleton: FunctionComponent<SkeletonProps> = ({ width, height }) => {
  return <div data-testid="skeleton" className={styles.skeleton} style={{ width, height }} />;
};
