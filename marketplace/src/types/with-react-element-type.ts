import { ReactElement } from 'react';

export type WithReactElementType<T> = {
  [K in keyof T]: T[K] | ReactElement;
};
