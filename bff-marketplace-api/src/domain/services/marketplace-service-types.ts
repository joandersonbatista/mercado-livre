enum Condition {
  NEW = 'new',
  USED = 'used',
  REFURBISHED = 'refurbished',
}

export enum FilterType {
  CATEGORY = 'category',
}

export type GetItemResult = {
  id: string;
  title: string;
  price: number;
  currency_id: string;
  category_id: string;
  thumbnail: string;
  condition: Condition;
  pictures: { url: string }[];
  shipping: {
    free_shipping: boolean;
  };
};

export type ItemFilter = {
  id: FilterType;
  name: string;
  type: string;
  values: {
    id: string;
    name: string;
    path_from_root: {
      id: string;
      name: string;
    }[];
  }[];
};

export type ListItem = {
  id: string;
  title: string;
  thumbnail: string;
  condition: string;
  category_id: string;
  sale_price: {
    amount: number;
    currency_id: string;
  };
  shipping: {
    free_shipping: boolean;
  };
};

export type ListItemsResult = {
  filters: ItemFilter[];
  items: ListItem[];
};

export type DescriptionResult = {
  plain_text: string;
};

export type CategoryResult = {
  path_from_root: { id: string; name: string }[];
};
