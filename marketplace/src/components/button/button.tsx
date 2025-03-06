import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from 'react';

import styles from './button.module.sass';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode };

export const Button: FunctionComponent<Props> = ({ children, ...props }) => {
  return (
    <button {...props} className={`${styles['button']} ${props.className ?? ''}`}>
      {children}
    </button>
  );
};
