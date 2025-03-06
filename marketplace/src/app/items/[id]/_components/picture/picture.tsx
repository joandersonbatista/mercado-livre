import { FunctionComponent, isValidElement } from 'react';

import { WithReactElementType } from '@/types/with-react-element-type';

import styles from './picture.module.sass';

type Props = WithReactElementType<{ picture: string }> & { alt?: string };

export const Picture: FunctionComponent<Props> = ({ picture, alt }) => (
  <div className={styles['picture-content']}>
    {isValidElement(picture) ? (
      picture
    ) : (
      <img src={picture} alt={alt} height="100%" width="100%" />
    )}
  </div>
);
