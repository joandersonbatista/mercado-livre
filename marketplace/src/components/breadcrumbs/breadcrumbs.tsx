import { FunctionComponent } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import styles from './breadcrumbs.module.sass';

type Breadcrumb = {
  name: string;
};

type Props = {
  items: Breadcrumb[];
};

export const Breadcrumbs: FunctionComponent<Props> = ({ items }) => {
  function isNotLastItem(itemIndex: number): boolean {
    return itemIndex !== items.length - 1;
  }

  return (
    <nav className={styles['nav-breadcrumbs']}>
      <ul>
        {items.map((item, index) => (
          <li key={item.name}>
            <Link href="" role="link">
              {item.name}
            </Link>
            {isNotLastItem(index) && (
              <Image src="/icons/chevron.svg" alt="icone chevron" width={10} height={8} />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
