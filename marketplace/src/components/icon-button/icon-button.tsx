import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from 'react';

import styles from './icon-button.module.sass';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
  ['data-testid']?: string;
};

export const IconButton: FunctionComponent<Props> = ({ icon, ...props }) => {
  return (
    <button
      {...props}
      data-testid={props['data-testid'] ?? 'icon-button'}
      className={`${styles['icon-button']} ${props.className ?? ''}`}
    >
      {icon}
    </button>
  );
};
