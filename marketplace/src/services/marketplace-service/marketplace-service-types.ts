import { Price } from '@/types/price-type';

export enum MarketplaceItemCondition {
  NEW = 'new',
  USED = 'used',
  REFURBISHED = 'refurbished',
}

type Author = {
  name: string;
  lastname: string;
};

export type MarketplaceItem = {
  id: string;
  title: string;
  description: string;
  picture: string;
  condition: MarketplaceItemCondition;
  free_shipping: boolean;
  price: Price;
};

export type GetItem = {
  author: Author;
  categories: string[];
  item: MarketplaceItem;
};

export type ListItems = {
  author: Author;
  categories: string[];
  items: Omit<MarketplaceItem, 'description'>[];
};
