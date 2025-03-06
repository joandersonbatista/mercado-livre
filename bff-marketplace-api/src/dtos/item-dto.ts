export type ItemDTO = {
  author: {
    name: string;
    lastname: string;
  };
  categories: string[];
  item: {
    id: string;
    title: string;
    price: {
      currency: string;
      amount: number;
      decimals: number;
    };
    picture: string;
    condition: string;
    free_shipping: boolean;
    description: string;
  };
};
