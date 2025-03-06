import { FunctionComponent, isValidElement } from 'react';

import { useTranslations } from 'next-intl';

import { WithReactElementType } from '@/types/with-react-element-type';

import styles from './description.module.sass';

type Props = WithReactElementType<{ description: string }>;

export const Description: FunctionComponent<Props> = ({ description }) => {
  const t = useTranslations('itemPage');

  return (
    <div className={styles['description-container']}>
      {isValidElement(description) ? (
        description
      ) : (
        <>
          <h2>{t('descriptionLabel')}</h2>
          <p>{description}</p>
        </>
      )}
    </div>
  );
};
